import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const formatMaterial = (materials) =>
  materials.map(
    (material) => `Nome: ${material.name} - Quantidade: ${material.amount}`
  );

const CustomTable = ({ onClick, rows, columns }) => {
  const classes = useStyles();
  return (
    <Paper>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, i) => (
              <TableCell
                key={"column" + i}
                align={
                  i === 0 || column.name === "materials" ? "left" : "right"
                }
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow onClick={() => onClick(row.objectId)} key={row.name}>
              {columns.map((column, i) => {
                if (i === 0)
                  return (
                    <TableCell
                      key={"rc" + row[column.name]}
                      component="th"
                      scope="row"
                    >
                      {row[column.name]}
                    </TableCell>
                  );
                else if (column.name === "materials")
                  return (
                    <TableCell key={"rc" + row[column.name]} align="left">
                      {formatMaterial(row[column.name]).map((materialRow) => (
                        <Typography key={materialRow}>{materialRow}</Typography>
                      ))}
                    </TableCell>
                  );
                else
                  return (
                    <TableCell key={"rc" + row[column.name]} align="center">
                      {row[column.name]}
                    </TableCell>
                  );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CustomTable;
