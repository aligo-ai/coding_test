import { createSignal, Match, Switch } from "solid-js";
import { Algo1 } from "./components/algo1";
import { Algo2 } from "./components/algo2";

function App() {
  const totalAlgos = 2;
  const [algo, setAlgo] = createSignal(1);
  const header = () => {
    switch (algo()) {
      case 1:
        return "문자 위치 추적기";
      case 2:
        return "최소 경로 합";
      default:
        return "";
    }
  };
  const headerDesc = () => {
    switch (algo()) {
      case 1:
        return "문자 위치 추적기 알고리즘 문제를 해결해보세요";
      case 2:
        return "그리드에서 최소 경로의 합을 구해보세요";
      default:
        return "";
    }
  };

  return (
    <div>
      <header>
        <div class="flex flex-col gap-2 border-b border-gray-200 py-4">
          <div class="container mx-auto">
            <h2 class="text-xl">
              {algo()} : {header()}
            </h2>
            <p class="text-sm text-gray-500">{headerDesc()}</p>
          </div>
        </div>
        <div class="border-b border-gray-200 py-4">
          <div class="container mx-auto flex items-center justify-between">
            <button
              class="flex items-center justify-center gap-1 rounded-md border-1 border-gray-200 px-4 py-2 text-sm disabled:pointer-events-none disabled:text-gray-400"
              onClick={() => {
                if (algo() <= totalAlgos && algo() > 1) {
                  setAlgo((prev) => prev - 1);
                }
              }}
              disabled={algo() === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                class="size-4"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m15 6l-6 6l6 6"
                />
              </svg>
              이전
            </button>
            <div>
              <span>{algo()}</span> / <span>{totalAlgos}</span>
            </div>
            <button
              class="flex items-center justify-center gap-1 rounded-md border-1 border-gray-200 px-4 py-2 text-sm disabled:pointer-events-none disabled:text-gray-400"
              data-algo={2}
              onClick={() => {
                if (algo() >= 1 && algo() < totalAlgos) {
                  setAlgo((prev) => prev + 1);
                }
              }}
              disabled={algo() === totalAlgos}
            >
              다음
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                class="size-4"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m9 6l6 6l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div>
        <Switch>
          <Match when={algo() === 1}>
            <Algo1 />
          </Match>
          <Match when={algo() === 2}>
            <Algo2 />
          </Match>
        </Switch>
      </div>
    </div>
  );
}

export default App;
