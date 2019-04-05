"use strict";

ChromeUtils.defineModuleGetter(this, "ExtensionCommon",
                               "resource://gre/modules/ExtensionCommon.jsm");
ChromeUtils.defineModuleGetter(this, "ExtensionLogging",
                               "resource://gre/modules/ExtensionLogging.jsm");

this.activityLog = class extends ExtensionAPI {
  getAPI(context) {
    return {
      activityLog: {
        onActivity: new ExtensionCommon.EventManager({
          context,
          name: "activityLog.onActivity",
          register: (fire, id) => {
            function handler(details) {
              fire.async(details);
            }

            ExtensionLogging.addListener(id, handler);
            return () => {
              ExtensionLogging.removeListener(id, handler);
            };
          }
        }).api(),
      },
    };
  }
};
