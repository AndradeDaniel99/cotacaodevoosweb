import requests
from bs4 import BeautifulSoup
import json

url = 'https://www.air-port-codes.com/airport-list'
response = requests.get(url)

soup = BeautifulSoup(response.text, 'html.parser')

# Encontre a tabela ou elemento que contém a lista de dados
# Exemplo: tabela = soup.find('table') ou elemento = soup.find_all('div', class_='sua-classe')
tabela = soup.find('ul', class_='airport-list')

# Extraia os dados e crie uma lista de dicionários
# Exemplo: data = [{"coluna1": celula1.text, "coluna2": celula2.text} for linha in tabela.find_all('tr') for celula1, celula2 in zip(linha.find_all('td'), linha.find_all('td', class_='sua-classe'))]

if tabela:
    # Extrair os textos dos <li> dentro do <ul>
    airport_names = [li.text for li in tabela.find_all('li')]
    print(airport_names)
else:
    print("Elemento não encontrado.")

# Salve a lista de dicionários como um arquivo JSON
with open('sua_lista.json', 'w', encoding='utf-8') as json_file:
    json.dump(airport_names, json_file, ensure_ascii=False, indent=2)
