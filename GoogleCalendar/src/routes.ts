import { Routes } from "@angular/router";
import { DayCalendarComponent } from "./calendarViews/dayView/day-calendar-component";
import { MonthCalendarComponent } from "./calendarViews/monthView/month-calendar-component";
import { WeekCalendarComponent } from "./calendarViews/weekView/week-calendar-components";

export const routes: Routes = [
  { path: "", component: MonthCalendarComponent },
  { path: "month", component: MonthCalendarComponent },
  { path: "week", component: WeekCalendarComponent },
  { path: "day", component: DayCalendarComponent },
];