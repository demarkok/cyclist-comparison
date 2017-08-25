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
	        	<Table>
	        		<TableHeader style={css.centerComponents} 
	        								displaySelectAll={false}
	            						adjustForCheckbox={false}>
			          <TableRow>
			            {this.renderColumnNames()}
			          </TableRow>
			         </TableHeader>
			      </Table>
		      </Paper>
        );
    };

    renderColumnNames = () => {
    		var columns = [];

    		for (var i = 0; i < this.props.data.columnNames.length; i++) {
	   				let column = this.props.data.columnNames[i];
	   				columns.push(<TableHeaderColumn> {column} </TableHeaderColumn>);
			  };

    	  return (
    	  		<div style={{ marginTop: "50px" }}>
							{columns}
						</div>
	   		);
    };
};

export default Tile;