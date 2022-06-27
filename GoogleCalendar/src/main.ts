import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app/app-component";
import { RouterModule } from "@angular/router";
import { routes } from "./routes";
import { MenuButtonComponent } from "./header/menu-button-component";
import { SidebarComponent } from "./sidebar/sidebar-component";
import { HeaderComponent } from "./header/header-component";
import { WeekCalendarComponent } from "./calendarViews/weekView/week-calendar-components";
import { MonthCalendarComponent } from "./calendarViews/monthView/month-calendar-component";
import { DayCalendarComponent } from "./calendarViews/dayView/day-calendar-component";
import { EventEditor } from "./calendarViews/dayView/eventEditor";
import { GuestInfoComponent } from "./calendarViews/dayView/guestInfoComponent";
import { CheckboxComponent } from "./sidebar/checkboxComponent";
import { SidebarMonthCalendarComponent } from "./sidebar/sidebar-month-calendar-component";
import { NewEventComponent } from "./calendarViews/dayView/new-event-component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: [
    AppComponent,
    MonthCalendarComponent,
    HeaderComponent,
    SidebarComponent,
    MenuButtonComponent,
    WeekCalendarComponent,
    DayCalendarComponent,
    EventEditor,
    GuestInfoComponent,
    CheckboxComponent,
    SidebarMonthCalendarComponent,
    NewEventComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err)); 