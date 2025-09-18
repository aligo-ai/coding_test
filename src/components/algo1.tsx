import { createSignal, For, Show } from "solid-js";
import { AlgoBase } from "./algo-base";

function charLocator(input: string) {
  let chars = new Map();

  let answer: number[] = [];

  for (let i = 0; i < input.length; ++i) {
    const c = input[i].toLowerCase();
    console.log(c.charCodeAt(0));

    if (!(97 <= c.charCodeAt(0) && c.charCodeAt(0) <= 122)) {
      console.log(`Unexpected char ${c}`);
      return [];
    }

    if (chars.has(c)) {
      answer.push(chars.get(input[i]));
    } else {
      chars.set(c, i);
      answer.push(-1);
    }
  }

  return answer;
}

export function Algo1() {
  const [input, setInput] = createSignal("");
  const [answer, setAnswer] = createSignal<number[]>([]);

  return (
    <AlgoBase>
      <div class="mt-6 w-full rounded-md border border-gray-200 p-4">
        <div>
          <p>입출력 예</p>
          <table>
            <thead>
              <tr>
                <td>s</td>
                <td>result</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>"developer"</td>
                <td>[-1, -1, -1, 1, -1, -1, -1, 1, -1]</td>
              </tr>
              <tr>
                <td>"programming"</td>
                <td>[-1, -1, -1, -1, 1, -1, -1, 6, -1, -1, 3]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mt-6 w-full rounded-md border border-gray-200 p-4">
        <p>솔루션 테스트</p>
        <div class="flex gap-4">
          <input
            value={input()}
            onChange={(e) => setInput(e.currentTarget.value)}
            class="flex-1 rounded-md bg-gray-200 px-3 py-1"
            placeholder="programming"
          />
          <button
            class="rounded-md bg-black px-4 py-2 text-white"
            onClick={() => setAnswer(charLocator(input()))}
          >
            실행
          </button>
        </div>
        <div class="mt-4 flex gap-4">
          <button
            class="rounded-md bg-black px-4 py-2 text-white"
            onClick={() => setInput("developer")}
          >
            테스트 1
          </button>
          <button
            class="rounded-md bg-black px-4 py-2 text-white"
            onClick={() => setInput("programming")}
          >
            테스트 2
          </button>
        </div>
        <div class="mt-4 min-h-8">
          <Show when={answer().length > 0}>
            <div class="flex gap-0.5 rounded-md bg-gray-300 p-4">
              {/* <For each={answer()}>{(i) => <span>{i}</span>}</For> */}[
              {answer()
                .map((v) => v.toString())
                .join(", ")}
              ]
            </div>
          </Show>
        </div>
      </div>
    </AlgoBase>
  );
}
