import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, makeStyles } from "@material-ui/core"
import { SuggestionProps, LatLng, Suggestion } from "../models/interfaces";

const useStyles = makeStyles({
  table: {
  },
});


export default function Suggestions(props:SuggestionProps){
  const classes = useStyles();
  const [currentPlaceID, setCurrentPlaceID] = React.useState<LatLng>({longitude:Infinity, latitude: Infinity});

  React.useEffect(()=>{ props.setParentState(currentPlaceID); }, [currentPlaceID]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          { 
            props.suggestions.map((suggestion:Suggestion) => (<TableRow key={suggestion.placeID} onClick={()=>setCurrentPlaceID(suggestion.geoLocation)}> 
            <TableCell>{suggestion.address}</TableCell> 
            </TableRow>)) 
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
