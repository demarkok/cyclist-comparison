import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import { Header, Table } from 'semantic-ui-react';

const inf = 10000000;

class Tile extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
          	<Paper zDepth={2}
          	  	 	 style={{ marginTop: "20px", 
                            backgroundColor: this.props.tileColor, 
                            marginLeft: "1em", 
                            marginRight: "1em", }}>

              <div style={{ marginTop: "50px" }}>
                <h3 style={{ textAlign: "center", marginTop: "1em", paddingTop: "1em" }}> {this.props.data.title} </h3>

                <div style={{ display: "flex",
                                                flexDirection: "column",
                                                paddingLeft: "1em", 
                                                paddingRight: "1em",}}>
      	        	<Table celled padded >

      	        		<Table.Header>
      			          
      			         {this.renderColumnNames()}
      			          
      			        </Table.Header>

                    {this.renderMembers()}

      			      </Table>
                </div>

                <h4 style={{ textAlign: "center", marginBottom: "1em", paddingBottom: "1em" }}> {this.props.data.date} </h4>
              </div>

  		      </Paper>
        );
    };

    createMember = (data) => {
      var columns = [];

      for (var i = 0; i < data.length; i++) {
        columns.push(
          <Table.Cell textAlign='center'> 
            {data[i] === "" ? "--" : data[i]} 
          </Table.Cell>
        );
      };

      return (
        <Table.Row>
          {columns}
        </Table.Row>
      );
    };

    renderMembers = () => {
      var members = [];
      let data = this.props.data.members;

      for (var i = 0; i < data.length; i++) {
            var memberData = data[i];

            members.push(this.createMember(memberData))
      };

      return (
        <Table.Body>
          {members}
        </Table.Body>
      );
    };

    renderColumnNames = () => {
    		var columns = [];

    		for (var i = 0; i < this.props.data.columnNames.length; i++) {
	   				let column = this.props.data.columnNames[i];

            if (i == 0) {
              columns.push(<Table.HeaderCell singleLine textAlign='center'> {column} </Table.HeaderCell>);
              continue;
            }

	   				columns.push(<Table.HeaderCell textAlign='center'> {column} </Table.HeaderCell>);
			  };

    	  return (
    	  		<Table.Row>
							{columns}
						</Table.Row>
	   		);
    };
};

export default Tile;