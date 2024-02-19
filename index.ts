import "@logseq/libs";
import * as dayjs from 'dayjs'


const TASK_MARKERS = new Set(["DONE", "NOW", "LATER", "DOING", "TODO", "WAITING"]);

function main() {
  logseq.DB.onChanged(async (e) => {
    const taskBlock = e.blocks.find((block) => TASK_MARKERS.has(block.marker));
    if (!taskBlock) {
      return;
    }

    const hasProperty = taskBlock.properties?.doneMs;

    if (taskBlock.marker === "DONE") {
      if (hasProperty) {
        return;
      }
      const now = dayjs();
      logseq.Editor.upsertBlockProperty(taskBlock.uuid, "done-ms", now.valueOf());
    } else {
      if (!hasProperty) {
        return;
      }
      logseq.Editor.removeBlockProperty(taskBlock.uuid, "done-ms");
    }
  });
}

logseq.ready(main).catch(console.error);
