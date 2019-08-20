import React, { useState, useEffect } from "react";

import "./App.css";
import { Container, TextField } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TrueCoachRecordSet } from "./tc-types";
import TcDataDisplay from "./TcDataDisplay";
import * as _ from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    }
  })
);
const App: React.FC = () => {
  const storageKey = "TC_DATA_PARSER";
  const [tcData, setTcData] = useState<Array<TrueCoachRecordSet>>([]);
  const [rawData, setRawData] = useState("");
  const classes = useStyles();
  const debounceSetData = _.debounce(setTcData, 500);
  // const prevData = localStorage.getItem(storageKey);
  // prevData && debounceSetData(JSON.parse(prevData));
  const updateData = (val: string) => {
    setRawData(val);
    try {
      const newData = JSON.parse(val);
      debounceSetData(newData);
      localStorage.setItem(storageKey, val);
    } catch (e) {
      console.error(e);
    }
  };
  const prevData = localStorage.getItem(storageKey);
  useEffect(() => {
    if (prevData && prevData !== rawData) {
      const newData = JSON.parse(prevData);
      setTcData(newData);
    }
  }, [prevData, rawData]);
  return (
    <Container maxWidth="xl">
      <TcDataDisplay data={tcData} />
      <hr />
      <TextField
        id="standard-multiline-flexible"
        label="Multiline"
        multiline
        rowsMax="4"
        value={rawData}
        fullWidth
        onChange={e => updateData(e.target.value)}
        className={classes.textField}
        margin="normal"
      />
      <hr />
    </Container>
  );
};

export default App;
