import json
import os
import requests
import re

page_ids = [
    120146, 120136, 120131 
]

json_file_path = "graph_data.json"

# JSON 파일을 확인하고 로드하는 함수
def load_json_data(file_path):
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            return json.load(file)
    else:
        return {"nodes": [], "links": []}

# Wikidocs API를 사용하여 페이지 내용을 가져오는 함수
def fetch_page_content(page_id):
    url = f"https://wikidocs.net/api/v1/page/{page_id}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

# 페이지 내용에서 특정 형식의 링크만 추출하는 함수
def extract_links(page_content):
    # "https://wikidocs.net/숫자" 형식 또는 숫자만 포함하는 링크를 찾는 정규식
    wikidocs_link_pattern = r'https://wikidocs.net/(\d+)|\]\((\d+)\)'
    links = re.findall(wikidocs_link_pattern, page_content)

    # 추출된 링크에서 숫자 부분만 반환
    extracted_links = [match[0] if match[0] else match[1] for match in links]
    return extracted_links

# JSON 파일에 데이터를 저장하는 함수
def save_json_data(file_path, data):
    with open(file_path, "w") as file:
        json.dump(data, file, indent=4)

# 새로운 노드 및 링크를 JSON 데이터에 추가하는 함수
def update_json_data(existing_data, new_node, new_links):
    # 노드 추가
    if new_node not in existing_data["nodes"]:
        existing_data["nodes"].append(new_node)

    # 링크 추가
    for link in new_links:
        if link not in existing_data["links"]:
            existing_data["links"].append(link)

    return existing_data

# JSON 데이터 로드
graph_data = load_json_data(json_file_path)

for page_id in page_ids:
    page_data = fetch_page_content(page_id)
    if page_data:
        content = page_data['content']
        subject = page_data['subject']
        links = extract_links(content)
        
        # 새로운 노드 및 링크 생성
        new_node = {"id": page_id, "name": subject, "url": f"https://wikidocs.net/{page_id}"}
        new_links = [{"source": page_id, "target": int(link)} for link in links]

        # JSON 데이터 업데이트 및 저장
        graph_data = update_json_data(graph_data, new_node, new_links)
        save_json_data(json_file_path, graph_data)
