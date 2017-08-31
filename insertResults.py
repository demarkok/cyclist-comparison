#!/usr/bin/python3

import psycopg2, csv, sys

# Script which inserts race results into a database.
#
# usage: ./insertResults.py RESULTS.csv DATABASE_PASSWORD
#
# A csv file corresponding the next table is expected:
#
# RACE_NAME    |  RACE_DATE     |  NUMBER_OF_LAPS  |                | 			
# -------------+----------------+------------------+----------------+------
# FIELD_NAME1  |  FILED_NAME_2  |  FIELD_NAME_3    |  FIELD_NAME_4  | ...
# -------------+----------------+------------------+----------------+------
# FIELD_1      |  FIELD_2       |  FIELD_3         |  FIELD_4       | ...
# -------------+----------------+------------------+----------------+------
# FIELD_1      |  FIELD_2       |  FIELD_3         |  FIELD_4       | ...
# -------------+----------------+------------------+----------------+------
#   .
#   .
#   .
# 
# Expected field names: place, name, yob, timeLap1, timeLap2, timeLap3, ... (yob means the year of birth).
# Nevertheless, you can add other fields, but they'll be ignored.
#
# Example:
#
# Зимний кубок               2017-01-15             5                                                                                    
# place                      name                   team               bib  yob   timeLap1  timeLap2  timeLap3  timeLap4  timeLap5  time      category
# 1                          Лалин Григорий         L-bike.ru          59   1965  00:11:44  00:11:40  00:11:51  00:11:47  00:11:40  00:58:42  50
# 2                          Гнедовский Владимир    ArcadaSport        50   1981  00:11:46  00:11:43  00:11:49  00:11:51  00:11:42  00:58:51  30
# 3                          Созонов Никита         лично              1    1984  00:11:43  00:12:03  00:12:08  00:12:25  00:12:31  01:00:50  30
# 4                          Степанов Антон                            18   1981  00:12:04  00:12:18  00:12:22  00:12:40  00:12:43  01:02:07  30
# 5                          Галафеев Андрей        ввв                86   1977  00:12:50  00:12:17  00:12:36  00:12:23  00:12:49  01:02:55  40
# 6                          Пономарев Денис        лично              3    1985  00:12:48  00:12:33  00:13:00  00:13:06  00:12:55  01:04:22  30



class Athlete:
    def __init__(self, name, yob):
        self.name = name
        if yob == None:
           self.yob = None
        else:
            self.yob = int(yob)
    
    def __eq__(self, other):
        if isinstance(other, self.__class__):
            return self.name == other.name and self.yob == other.yob
        else:
            return False

    def __ne__(self, other):
        return not self.__eq__(other)
    
    def __str__(self):
        return "(%s: %d)" % (self.name, self.yob)
    
    def __repr__(self):
        return __str__(self)

class Race:
    def __init__(self, name, date, number_of_laps):
        self.name = name
        self.date = date
        self.number_of_laps = int(number_of_laps)
    def __str__(self):
        return "(%s, %s, %s)" % (self.name, self.date, self.number_of_laps)
    def __repr__(self):
        return __str__(self)

class Result:
    def __init__(self, race_id, athlete_id, place, time, laps):
        self.race_id = race_id
        self.athlete_id = athlete_id
        self.place = place
        self.time = time
        self.laps = laps


def insertAthlete(conn, athlete):
    cur = conn.cursor()
    cur.execute("insert into athletes (name, yob) values(%s, %s)", (athlete.name, athlete.yob))

def getAthletes(conn):
    cur = conn.cursor()
    cur.execute("select name, yob from athletes;")
    return [Athlete(name, yob) for (name, yob) in cur.fetchall()]

def insertRace(conn, race):
    cur = conn.cursor()
    cur.execute("insert into races (name, date, number_of_laps) values (%s, %s, %s)", (race.name, race.date, race.number_of_laps))

def getRaceId(conn, race):
    cur = conn.cursor()
    cur.execute("select id from races where name = %s", (race.name,))
    (id,) = cur.fetchone()
    return id

def getAthleteId(conn, name):
    cur = conn.cursor()
    cur.execute("select id from athletes where name = %s", (name,))
    (id,) = cur.fetchone()
    return id

def getSec(timeStr):
    h, m, s = timeStr.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)

def main(argv):
    filename = argv[0]
    password = argv[1]
    
    with open(filename, 'r') as f:
        reader = csv.reader(f)
        gotList = list(reader)

    info = gotList[0]
    names = gotList[1]
    data = gotList[2:]

    (raceName, date, numberOfLaps) = tuple(info[0:3])

    resDicts = list(map(lambda li : dict(zip(names,li)), data))

    race = Race(info[0], info[1], info[2])

    conn = psycopg2.connect(dbname = "qfjtuala", user = "qfjtuala", password = password, host = "pellefant.db.elephantsql.com", port = "5432")
    # conn = psycopg2.connect(connectionConfig)
    
    athletes = list(map(lambda di : Athlete(di["name"], di["yob"]), resDicts))
    existedAthletes = getAthletes(conn)
    athletesToAdd = [athlete for athlete in athletes if athlete not in existedAthletes]

    insertRace(conn, race)

    for athlete in athletesToAdd:
        insertAthlete(conn, athlete)

    for row in resDicts:
        cur = conn.cursor()
        cur.execute("insert into results (race_id, athlete_id, place, time_in_secs) values (%s, %s, %s, %s) returning result_id", 
                (getRaceId(conn, race), getAthleteId(conn, row["name"]), row["place"], getSec(row["time"])))
        (result_id,) = cur.fetchone()
        for i in range(race.number_of_laps):
            columnName = "timeLap" + str(i + 1)
            if row[columnName] == '':
                break
            cur.execute("insert into lap_results (result_id, lap_index, time_in_secs) values (%s, %s, %s)", (result_id, i + 1, getSec(row[columnName])))
        print(row)
    conn.commit()


if __name__ == "__main__":
    main(sys.argv[1:])
