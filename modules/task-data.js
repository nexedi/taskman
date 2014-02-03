/*jslint indent: 2 */
/*global window */

(function () {
  "use strict";

  window.task_data = {
    "view": "normal",
    "projects": [
      { "type": "Project",
        "project": "Default Project",
        "project_i18n": "settings.content.default"
        },
      { "type": "Project",
        "project": "Events"
        },
      { "type": "Project",
        "project": "Market Garden"
        }
    ],
    "states": [
      {"type": "State", "state": "Started"},
      {"type": "State", "state": "Confirmed"},
      {"type": "State", "state": "Completed"}
    ],
    "tasks": [
      { "type": "Task",
        "title": "Jquery mobile in action",
        "project": "Default Project",
        "start": "2013-05-19T22:00:00.000Z",
        "stop": "2013-11-01T23:00:00.000Z",
        "state": "Completed",
        "description": "some description coming soon"
        },
      { "type": "Task",
        "title": "HTML5 and CSS3 overview",
        "project": "Default Project",
        "start": "2013-01-14T23:00:00.000Z",
        "stop": "2014-10-29T23:00:00.000Z",
        "state": "Started",
        "description": "task manager app with JQM"
        },
      { "type": "Task",
        "title": "Other staffs",
        "project": "Default Project",
        "start": "2013-05-14T23:00:00.000Z",
        "stop": "2014-10-29T23:00:00.000Z",
        "state": "Confirmed",
        "description": "some description"
        },
      { "type": "Task",
        "title": "Vintage",
        "project": "Market Garden",
        "start": "2014-09-15",
        "stop": "2014-10-01",
        "state": "Confirmed",
        "description": "La vendange est la récolte du raisin destiné à la production du vin"
        },
      { "type": "Task",
        "title": "Winter Olympics",
        "project": "Events",
        "start": "2014-02-07",
        "stop": "2014-02-23",
        "state": "Confirmed",
        "description": "2014 Winter Olympics held in Sochi, Russia."
        },
      { "type": "Task",
        "title": "Solar eclipse",
        "project": "Events",
        "start": "2014-04-29",
        "stop": "2014-04-29",
        "state": "Confirmed",
        "description": ""
        },
      { "type": "Task",
        "title": "Soccer World Cup",
        "project": "Events",
        "start": "2014-06-12",
        "stop": "2014-07-13",
        "state": "Confirmed",
        "description": "2014 FIFA World Cup held in Brazil."
        }
    ]
  };

}());

