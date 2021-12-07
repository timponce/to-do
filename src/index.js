import * as initial from './initialLoad';
import { format, parseISO, isToday } from 'date-fns';

initial.loadHeader();
initial.loadSidebar();
initial.loadFooter();
initial.loadMain();
initial.headerController();
initial.sidebarController();
initial.addTask();