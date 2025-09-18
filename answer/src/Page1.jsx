import { useState, useRef } from 'react';

function Page1({ pageChange }) {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  // AL_1
  function textLocationTracker(text) {
    const result = [];
    const textLocation = new Map();

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      result.push(textLocation.get(char) ?? -1);

      if (!textLocation.has(char)) {
        textLocation.set(char, i);
      }
    }

    return result;
  }

  // handler
  function solutionTest() {
    if (!inputValue.trim()) {
      window.alert('문자열을 입력해주세요.');
      return;
    }

    const result = textLocationTracker(inputValue);

    setResult(`[${result.join(',')}]`);

    return;
  }

  function exampleTest(example) {
    setInputValue(example);

    const result = textLocationTracker(example);
    setResult(`[${result.join(',')}]`);

    if (inputRef.current) {
      inputRef.current.blur();
    }
  }

  return (
    <>
      <div className="header">
        <div className="header-content">
          <h1 className="header-title">문제 1: 문자 위치 추적기</h1>
          <p className="header-subtitle">
            문자 위치 추적기 알고리즘 문제를 해결해보세요
          </p>
        </div>
      </div>

      <div className="navigation">
        <button className="navigation-button">이전</button>
        <span className="navigation-content">1 / 2</span>
        <button className="navigation-button" onClick={() => pageChange(2)}>
          다음
        </button>
      </div>

      <main className="main-content">
        <div className="content-container">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">입출력 예</h4>
            </div>

            <div className="card-content">
              <div className="table-container">
                <table className="example-table">
                  <thead>
                    <tr className="table-header">
                      <th className="table-header-cell">s</th>
                      <th className="table-header-cell">result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table-cell">"developer"</td>
                      <td className="table-cell">
                        [-1, -1, -1, 2, -1, -1, -1, 4, -1]
                      </td>
                    </tr>
                    <tr>
                      <td className="table-cell">"programming"</td>
                      <td className="table-cell">
                        [-1, -1, -1, -1, 3, -1, -1, 1, -1, -1, 7]
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">솔루션 테스트</h4>
          </div>
          <div className="card-content">
            <div className="test-container">
              <div className="input">
                <input
                  type="text"
                  ref={inputRef}
                  value={inputValue}
                  placeholder="테스트할 문자열을 입력하세요 (예: developer)"
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
                onClick={() => exampleTest('developer')}
              >
                "developer"
              </button>
              <button
                className="example-button"
                onClick={() => exampleTest('programming')}
              >
                "programming"
              </button>

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

export default Page1;
