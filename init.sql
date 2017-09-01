create table athletes (
	id serial PRIMARY KEY,
	name text,
	yob smallint check (yob between 0 and extract(year from current_date)),
    unique (name, yob)
);

create table races (
	id serial PRIMARY KEY,
	name text,
	date date,
	number_of_laps smallint check (number_of_laps > 0)
);

create table results (
	result_id serial PRIMARY KEY,
	race_id integer references races (id),
	athlete_id integer references athletes (id),
	place smallint check (place > 0),
	time_in_secs int
);

create table lap_results (
	result_id integer references results,
	lap_index smallint check (lap_index > 0),
	time_in_secs int 
);
