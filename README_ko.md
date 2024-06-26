# AI & ML 용어 관계 시각화

이 저장소는 위키독스의 [인공지능(AI) & 머신러닝(ML) 사전](https://wikidocs.net/book/5942)에 있는 용어들 간의 관계를 시각화하기 위한 데이터와 샘플 코드를 포함하고 있습니다.

## 파일 설명

- `graph_data.json`: AI & ML 용어들과 그들 간의 관계를 담고 있는 JSON 파일입니다.
- `build_graph.py`: 위키독스 API를 사용하여 용어 데이터를 수집하고 `graph_data.json`을 생성하는 Python 스크립트입니다.
- `graph_all.html`: 모든 용어와 관계를 표시하는 전체 그래프를 생성하는 HTML 파일입니다.
- `graph_depth2.html`: 선택된 용어로부터 깊이 2까지의 관계를 표시하는 그래프를 생성하는 HTML 파일입니다.
- `graph_depth2_targetonly.html`: 선택된 용어에서 출발하는 방향으로만 깊이 2까지의 관계를 표시하는 그래프를 생성하는 HTML 파일입니다.
- `graph_depth2_interconnect.html`: 선택된 용어로부터 깊이 2까지의 모든 연결을 보여주는 대화형 그래프를 생성하는 HTML 파일입니다.

각 HTML 파일은 D3.js 라이브러리를 사용하여 그래프를 시각화합니다.

## 사용 방법

1. `graph_data.json`을 최신 데이터로 업데이트하려면 `build_graph.py`를 실행하세요.
2. 원하는 HTML 파일을 웹 브라우저에서 열어 그래프를 확인하세요.
3. 실제 위키독스 사이트에서는 `graph_depth2_interconnect.html`의 코드가 사용되고 있습니다.

이 시각화 도구를 통해 AI & ML 용어들 간의 관계를 쉽게 탐색할 수 있습니다.
