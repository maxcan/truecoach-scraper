import React from "react";
import sanitize from "sanitize-html";
import { TrueCoachRecordSet, Workout, WorkoutItem } from "./tc-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

const TcDataDisplay: React.FC<{ data: Array<TrueCoachRecordSet> }> = ({
  data
}) => {
  const workoutMap: Record<string, Workout> = {};
  const workoutItemMap: Record<string, WorkoutItem> = {};
  const dayMap: Map<Date, Array<Workout>> = new Map();
  data.forEach(recordSet => {
    recordSet.workouts.forEach(workout => {
      const todayWorkouts = dayMap.get(workout.due);
      dayMap.set(
        workout.due,
        todayWorkouts ? [workout, ...todayWorkouts] : [workout]
      );
      workoutMap[workout.id] = workout;
    });
    recordSet.workout_items.forEach(wi => (workoutItemMap[wi.id] = wi));
  });
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from(dayMap.entries()).map(([day, dayWorkouts], idx) => (
          <TableRow key={idx}>
            <TableCell style={{ minWidth: "10vw" }}>{day}</TableCell>
            <TableCell style={{ minWidth: "20vw" }}>
              {dayWorkouts.map((workout, workout_idx) => (
                <div
                  key={workout_idx}
                  dangerouslySetInnerHTML={{
                    __html: sanitize(workout.short_description)
                  }}
                />
              ))}
            </TableCell>
            <TableCell>
              <ol>
                {dayWorkouts.map((workout, workout_idx) =>
                  workout.workout_item_ids.map(
                    (item_id, item_idx) =>
                      workoutItemMap[item_id] && (
                        <li key={item_idx}>
                          {workoutItemMap[item_id].info}
                          <br />
                          <b>{workoutItemMap[item_id].result}</b>
                        </li>
                      )
                  )
                )}
              </ol>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TcDataDisplay;
