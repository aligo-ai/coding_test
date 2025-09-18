import { useState, useRef } from 'react';

function Page2({ pageChange }) {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  // AL_2
  function minPath(grid) {
    const m = grid.length;
    const n = grid[0].length;

    let dp = [];
    for (let i = 0; i < m; i++) {
      dp[i] = [];
    }

    dp[0][0] = grid[0][0];

    for (let j = 1; j < n; j++) {
      dp[0][j] = dp[0][j - 1] + grid[0][j];
    }

    for (let k = 1; k < m; k++) {
      dp[k][0] = dp[k - 1][0] + grid[k][0];
    }

    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
      }
    }

    return dp[m - 1][n - 1];
  }

  function solutionTest() {
    if (!inputValue.trim()) {
      window.alert('그리드를 입력해주세요.');
      return;
    }

    try {
      const grid = JSON.parse(inputValue);
      const result = minPath(grid);
      setResult(`${result}`);
    } catch (e) {
      window.alert(
        '올바른 2D 배열 형식으로 입력하세요. 예: [[1,3,1],[1,5,1],[4,2,1]]',
      );
    }

    return;
  }

  function exampleTest(example) {
    const grid = example;
    setInputValue(JSON.stringify(grid));

    const result = minPath(example);
    setResult(`${result}`);

    if (inputRef.current) {
      inputRef.current.blur();
    }
  }

  const GridTable = ({ input }) => {
    const grid = JSON.parse(input);

    minPath(grid);

    return (
      <div className="grid-container">
        <table className="grid-table">
          <tbody>
            {grid.map((m, i) => (
              <tr className="table-row" key={i}>
                {m.map((cell, j) => (
                  <td className="grid-cell" key={`cell-${i}-${j}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div className="header">
        <div className="header-content">
          <h1 className="header-title">문제 2: 최소 경로 합</h1>
          <p className="header-subtitle">
            그리드에서 최소 경로의 합을 구해보세요
          </p>
        </div>
      </div>

      <div className="navigation">
        <button className="navigation-button" onClick={() => pageChange(1)}>
          이전
        </button>
        <span className="navigation-content">2 / 2</span>
        <button className="navigation-button">다음</button>
      </div>

      <main className="main-content">
        <div className="content-container">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">입출력 예</h4>
            </div>

            <div className="card-content">
              <div className="example-section">
                <h4 className="example-title">예제 1:</h4>
                <div className="table-container">
                  <table className="grid-table">
                    <tr className="grid-row">
                      <th className="grid-cell">1</th>
                      <th className="grid-cell">3</th>
                      <th className="grid-cell">1</th>
                    </tr>
                    <tr className="grid-row">
                      <th className="grid-cell">1</th>
                      <th className="grid-cell">5</th>
                      <th className="grid-cell">1</th>
                    </tr>
                    <tr className="grid-row">
                      <th className="grid-cell">4</th>
                      <th className="grid-cell">2</th>
                      <th className="grid-cell">1</th>
                    </tr>
                  </table>
                </div>

                <div className="example-description">
                  <ul className="example-list">
                    <li>입력: grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]</li>
                    <li>출력: 7</li>
                    <li>
                      설명: 위 grid에서 최소합을 가지는 경로는 1 → 3 → 1 → 1 →
                      1로 7이 됩니다.
                    </li>
                  </ul>

                  <h4 className="example-title">예제 2:</h4>
                  <ul className="example-list">
                    <li>입력: grid = [[1, 2, 3], [4, 5, 6]]</li>
                    <li>출력: 12</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4>솔루션 테스트</h4>
          </div>
          <div className="card-content">
            <div className="test-container">
              <div className="input">
                <input
                  type="text"
                  ref={inputRef}
                  value={inputValue}
                  placeholder="그리드를 입력하세요 (예: [[1,3,1], [1,5,1], [4,2,1])"
                  onChange={e => setInputValue(e.target.value)}
                  className="test-input"
                />
                <button onClick={solutionTest} className="play-button">
                  실행
                </button>
              </div>

              <br />
              <span className="example-label">예제 실행:</span>
              <button
                className="example-button"
                onClick={() =>
                  exampleTest([
                    [1, 3, 1],
                    [1, 5, 1],
                    [4, 2, 1],
                  ])
                }
              >
                예제 1
              </button>
              <button
                className="example-button"
                onClick={() =>
                  exampleTest([
                    [1, 2, 3],
                    [4, 5, 6],
                  ])
                }
              >
                예제 2
              </button>

              {inputValue && (
                <div className="result-content">
                  <h4 className="result-label">입력된 그리드:</h4>
                  <GridTable input={inputValue} />
                </div>
              )}

              {result && (
                <div className="result-content">
                  <h4 className="result-label">결과:</h4>
                  <div className="result-text">{result}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Page2;
