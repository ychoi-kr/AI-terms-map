d3.json('https://raw.githubusercontent.com/ychoi-kr/AI-terms-map/main/graph_data.json').then(data => {
    // h1 태그의 텍스트 읽기
    const h1Text = document.querySelector('h1').textContent;

    if (!h1Text.includes(':')) {
        return; // 콜론이 없으면 함수 실행을 중단
    }

    // 시작 노드 식별
    const startNode = data.nodes.find(node => node.name.includes(h1Text.split('(')[0].split(':')[0].trim()));

    // 깊이 2까지의 노드와 링크 필터링
    let depth2Nodes = new Set([startNode.id]);
    let depth2Links = [];
    let currentDepthNodes = [startNode.id];

    for (let i = 0; i < 2; i++) {
        let nextDepthNodes = [];
        data.links.forEach(link => {
            if (currentDepthNodes.includes(link.source) && !depth2Nodes.has(link.target)) {
                depth2Nodes.add(link.target);
                nextDepthNodes.push(link.target);
                depth2Links.push(link);
            } else if (currentDepthNodes.includes(link.target) && !depth2Nodes.has(link.source)) {
                depth2Nodes.add(link.source);
                nextDepthNodes.push(link.source);
                depth2Links.push(link);
            }
        });
        currentDepthNodes = nextDepthNodes;
    }

    const filteredNodes = data.nodes.filter(node => depth2Nodes.has(node.id));
// 필터링된 링크 데이터 (모든 링크의 소스와 타겟 노드가 filteredNodes 내에 존재하는지 확인)
const filteredLinks = depth2Links.filter(link => 
    filteredNodes.some(node => node.id === link.source) && 
    filteredNodes.some(node => node.id === link.target)
);

// 'graph-container' div 선택
const container = d3.select("#graph-container");

let width = 600;
let height = 600;
// div에 직접 SVG 요소 추가
const svg = container.append("svg")
.attr("width", width)
.attr("height", height)
.style("background-color", "lightblue");

const link = svg.append("g")
.attr("stroke", "#999")
.attr("stroke-opacity", 0.6)
.selectAll("line")
.data(filteredLinks)
.join("line")
.attr("stroke-width", d => Math.sqrt(d.value));

const node = svg.append("g")
.attr("stroke", "#fff")
.attr("stroke-width", 1.5)
.selectAll("circle")
.data(filteredNodes)
.join("circle")
.attr("r", 5)
.attr("fill", "#69b3a2");

// 노드에 텍스트 라벨 추가
const labels = svg.append("g")
.attr("class", "labels")
.selectAll("text")
.data(filteredNodes)
.join("text")
.attr("x", 8)
.attr("y", 3)
.text(d => d.name.split('(')[0].split(':')[0].trim())
.style("cursor", "pointer")
.on("click", (event, d) => {
window.open(d.url, '_self');
})
.on("mouseover", function() {
d3.select(this).style("text-decoration", "underline");
})
.on("mouseout", function() {
d3.select(this).style("text-decoration", "none");
});

// 시뮬레이션
const simulation = d3.forceSimulation(filteredNodes)
.force("link", d3.forceLink(filteredLinks).distance(70).id(d => d.id))
.force("charge", d3.forceManyBody())
.force("center", d3.forceCenter(width / 2, height / 2));

simulation.on("tick", () => {
link
.attr("x1", d => d.source.x)
.attr("y1", d => d.source.y)
.attr("x2", d => d.target.x)
.attr("y2", d => d.target.y);

node
.attr("cx", d => d.x)
.attr("cy", d => d.y);

labels
.attr("x", d => d.x)
.attr("y", d => d.y);

});

// 드래그 이벤트 핸들러 정의
function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}

// 노드에 드래그 기능 적용
node.call(drag(simulation));

});
