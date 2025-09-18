import { createEffect, createSignal, For, Show } from "solid-js";
import { AlgoBase } from "./algo-base";

type Cell = {
  filled: boolean;
  weight: number;
};

type GridProps = {
  cols: number;
  rows: number;
  cells: Cell[];
};

function Grid(props: GridProps) {
  return (
    <div>
      <div
        class="grid"
        style={{
          // ✅ columns = cols, rows = rows
          "grid-template-columns": `repeat(${props.cols}, 64px)`,
          "grid-template-rows": `repeat(${props.rows}, 64px)`,
        }}
      >
        {/* ✅ 바깥 루프: rows, 안쪽 루프: cols */}
        <For each={Array.from({ length: props.rows })}>
          {(_, row) => (
            <For each={Array.from({ length: props.cols })}>
              {(_, col) => {
                // ✅ 인덱스: idx = row * cols + col
                const idx = row() * props.cols + col();
                const cell = props.cells[idx];
                return (
                  <div
                    data-row={row()}
                    data-col={col()}
                    data-filled={cell.filled}
                    class="grid place-content-center border border-black data-[filled=true]:bg-orange-500"
                  >
                    <span class="text-lg">{cell.weight}</span>
                  </div>
                );
              }}
            </For>
          )}
        </For>
      </div>
    </div>
  );
}

// dp
// (i, j, w)
// dp[i][j] = weight[i][j] + min(dp[i-1][j], dp[i][j-1])

export function minWeightPath(
  cols: number,
  rows: number,
  grid: Cell[],
): { cost: number; path: Cell[] } {
  const INF = Number.POSITIVE_INFINITY;

  if (cols <= 0 || rows <= 0) {
    return {
      cost: INF,
      path: grid.map((c) => ({ filled: false, weight: c.weight })),
    };
  }
  if (grid.length !== rows * cols) {
    throw new Error(
      `grid length mismatch: expected ${rows * cols}, got ${grid.length}`,
    );
  }

  // O(cols) DP + parent로 경로 복원
  const dp = new Array<number>(cols).fill(INF);
  const parent = new Int32Array(rows * cols).fill(-1); // 이전 칸 인덱스

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const w = grid[idx]?.weight;

      if (!Number.isFinite(w)) {
        dp[c] = INF;
        parent[idx] = -1;
        continue;
      }

      if (r === 0 && c === 0) {
        dp[c] = w!;
        parent[idx] = -1;
        continue;
      }

      const fromTop = r > 0 ? dp[c] : INF; // (r-1,c)
      const fromLeft = c > 0 ? dp[c - 1] : INF; // (r,c-1)

      if (fromTop <= fromLeft) {
        dp[c] = fromTop === INF ? INF : fromTop + (w as number);
        parent[idx] = fromTop === INF ? -1 : (r - 1) * cols + c;
      } else {
        dp[c] = fromLeft === INF ? INF : fromLeft + (w as number);
        parent[idx] = fromLeft === INF ? -1 : r * cols + (c - 1);
      }
    }
  }

  const cost = dp[cols - 1];

  // 경로 인덱스 집합 만들기
  const onPath = new Set<number>();
  if (Number.isFinite(cost)) {
    let cur = rows * cols - 1;
    while (cur !== -1) {
      onPath.add(cur);
      cur = parent[cur];
    }
  }

  // 새 배열 생성: 경로만 filled=true
  const path: Cell[] = grid.map((cell, idx) => ({
    filled: onPath.has(idx),
    weight: cell.weight,
  }));

  return { cost, path };
}

export function Algo2() {
  const [input, setInput] = createSignal("");
  const [cols, setCols] = createSignal(0);
  const [rows, setRows] = createSignal(0);
  const grid: () => Cell[] = () => {
    try {
      const m: number[][] = JSON.parse(input());
      // ✅ rows = m.length, cols = m[0].length
      setRows(m.length);
      setCols(m[0]?.length ?? 0);

      return m.flat().map((v) => ({ filled: false, weight: v }));
    } catch {
      setRows(0);
      setCols(0);
      return [];
    }
  };
  const [answer, setAnswer] = createSignal<{
    cost: number;
    path: Cell[];
  } | null>(null);

  return (
    <AlgoBase>
      <div class="mt-6 w-full rounded-md border border-gray-200 p-4">
        <p>입출력 예</p>
        <div class="mt-6">
          <p>예제 1</p>
          <div class="mt-1">
            <Grid
              cols={3}
              rows={3}
              cells={[
                { filled: true, weight: 1 },
                { filled: true, weight: 3 },
                { filled: true, weight: 1 },
                { filled: false, weight: 1 },
                { filled: false, weight: 5 },
                { filled: true, weight: 1 },
                { filled: false, weight: 4 },
                { filled: false, weight: 2 },
                { filled: true, weight: 1 },
              ]}
            />
          </div>
          <ul class="mt-5 ml-6">
            <li class="list-disc">
              입력: grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]
            </li>
            <li class="list-disc">출력: 7</li>
            <li class="list-disc">
              설명: 위 grid에서 최소합을 가지는 경로는 1 → 3 → 1 → 1 → 1로 7이
              됩니다.
            </li>
          </ul>
        </div>
        <div class="mt-6">
          <p>예제 2</p>
          <ul class="mt-5 ml-6">
            <li class="list-disc">입력: grid = [[1, 2, 3], [4, 5, 6]]</li>
            <li class="list-disc">출력: 12</li>
          </ul>
        </div>
      </div>
      <div class="mt-6 w-full rounded-md border border-gray-200 p-4">
        <p>솔루션 테스트</p>
        <div class="flex gap-4">
          <input
            value={input()}
            class="flex-1 rounded-md bg-gray-200 px-3 py-1"
            placeholder="[[1, 3, 1], [1, 5, 1], [4, 2, 1]]"
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <button
            class="rounded-md bg-black px-4 py-2 text-white"
            onClick={() => {
              console.log(grid(), cols(), rows());
              const val = minWeightPath(cols(), rows(), grid());
              console.log(val);
              setAnswer(val);
            }}
          >
            실행
          </button>
        </div>
        <div class="mt-4 flex gap-4">
          <button
            class="rounded-md bg-black px-4 py-2 text-white"
            onClick={() => setInput("[[1, 3, 1], [1, 5, 1], [4, 2, 1]]")}
          >
            테스트 1
          </button>
          <button
            class="rounded-md bg-black px-4 py-2 text-white"
            onClick={() => setInput("[[1, 2, 3], [4, 5, 6]]")}
          >
            테스트 2
          </button>
        </div>
        <div class="mt-4 min-h-8">
          <Show when={answer() !== null}>
            <Grid cols={cols()} rows={rows()} cells={answer()!.path}></Grid>
            <div class="mt-2">
              <p>결과</p>
              <div class="flex gap-0.5 rounded-md bg-gray-300 p-4">
                <span class="text-xl">{answer()!.cost}</span>
              </div>
            </div>
          </Show>
        </div>
      </div>
    </AlgoBase>
  );
}
