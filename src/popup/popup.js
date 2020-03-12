"use strict";

window.addEventListener("load", async () => {
  let list = document.getElementById("list");
  let addons = await browser.management.getAll();
  for (let addon of addons) {
    if (addon.type !== "extension" || !addon.enabled) { continue; }
    ( ({name, id}) => {
      let item = document.createElement("li");
      item.innerText = name;
      item.addEventListener("click", () => {
        browser.tabs.create({
          url: `${browser.runtime.getURL("log/log.html")}#${id}`,
        });
        window.close();
      });
      list.appendChild(item);
    }) (addon);
  }
});
