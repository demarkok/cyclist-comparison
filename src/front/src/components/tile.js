import React from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import css from './ui.js';

class Tile extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
        	<Paper zDepth={2}
        	  	 	 style={{ marginTop: "20px" }}>
	        	<Table selectable={false}>

	        		<TableHeader displaySelectAll={false}
	            						adjustForCheckbox={false}>
			          
			         {this.renderColumnNames()}
			          
			        </TableHeader>

              {this.renderMembers()}

			      </Table>
		      </Paper>
        );
    };

    createMember = (data) => {
      var columns = [];

      for (var i = 0; i < data.length; i++) {
            columns.push(<TableRowColumn> {data[i]} </TableRowColumn>);
      };

      return (
        <TableRow>
          {columns}
        </TableRow>
      );
    };

    renderMembers = () => {
      var members = [];

      for (var i = 0; i < this.props.data.members.length; i++) {
            var memberData = this.props.data.members[i];
            members.push(this.createMember(memberData))
      };

      return (
        <TableBody displayRowCheckbox={false}>
          {members}
        </TableBody>
      );
    };

    renderColumnNames = () => {
    		var columns = [];

    		for (var i = 0; i < this.props.data.columnNames.length; i++) {
	   				let column = this.props.data.columnNames[i];
	   				columns.push(<TableHeaderColumn> {column} </TableHeaderColumn>);
			  };

    	  return (
    	  		<TableRow style={{ marginTop: "50px" }}>
							{columns}
						</TableRow>
	   		);
    };
};

export default Tile;