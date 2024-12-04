import { readFile } from "fs/promises";

const fileBuffer = await readFile("./inputs/1.txt");
const fileString = fileBuffer.toString();

const [leftList, rightList] = fileString
  .split("\n")
  .filter((i) => i)
  .reduce(
    (lists, row) => {
      const numbers = row.split(/\s+/);
      lists[0].push(+numbers[0]);
      lists[1].push(+numbers[1]);
      return lists;
    },
    [[], []]
  );
const [sortedLeftList, sortedRightList] = [leftList, rightList].map((list) =>
  list.toSorted()
);

const diffs = sortedLeftList.map((l, i) => Math.abs(sortedRightList[i] - l));
const sumDiffs = diffs.reduce((sum, next) => sum + next);
console.log("part 1", sumDiffs);

const numberOfAppearances = (list, item) =>
  list.filter((e) => e === item).length;

const similarityScore = leftList.reduce(
  (score, l) => score + l * numberOfAppearances(rightList, l),
  0
);

console.log("part 2", similarityScore);
