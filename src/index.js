import * as initial from './initialLoad';
import { format, parseISO, isToday, isThisWeek } from 'date-fns';

initial.getLocalStorage();
initial.loadHeader();
initial.loadSidebar();
initial.loadFooter();
initial.loadMain();
initial.headerController();
initial.sidebarController();
initial.addTask();