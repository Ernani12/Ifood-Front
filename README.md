# 🍕 iFood Pizza Simulator

<img width="1080" height="630" alt="image" src="https://github.com/user-attachments/assets/b76e58fa-1593-4a13-bb4f-7e0b88735721" />



> Simulação de um cenário de alta demanda de vendas (como Black Friday) usando **Angular** e **Java Spring Boot**, com arquitetura moderna e escalável.

---

## 📝 Sobre o Projeto

Este projeto é um **simulador de pedidos no estilo iFood**, com foco em **alta escalabilidade** e **arquitetura moderna** para microserviços. Ele demonstra como um sistema de pedidos de comida (pizzas, neste caso) pode lidar com picos de demanda, usando tecnologias atuais de cloud e devops.

### Tecnologias e Conceitos

- **Frontend:** Angular (SPA moderno e responsivo)
- **Backend:** Java Spring Boot
- **Arquiteturas:**  
  - SOLID  
  - Clean Architecture  
  - Arquitetura Hexagonal
- **Microserviços:** Separação de domínios e serviços independentes
- **Containers e Orquestração:**  
  - Docker  
  - Kubernetes
- **Monitoramento e Observabilidade:** Prometheus, Grafana
- **Mensageria:** Kafka
- **Cache e Persistência:** Redis
- **Cloud:**  
  - AWS (Lambda, EC2, EKS)  
  - LocalStack para simulação de serviços AWS
- **CI/CD:** Automação completa de build, testes e deploy
- **Escalabilidade Horizontal:** Simulação de aumento de carga durante períodos críticos como Black Friday

---

## ⚡ Cenário de Simulação

Imagine um **feriado como uam Black Friday (feriado que aumenta consumo Mercado Livre, Amazon , IFOOD)*, onde pedidos de pizza aumentam exponencialmente no iFood:

- A arquitetura **microserviços** permite que cada serviço escale individualmente
- Kubernetes faz o **balanceamento de carga horizontal**
- Kafka garante que as mensagens (pedidos) não se percam
- Redis mantém dados temporários e cache de alto desempenho
- Prometheus + Grafana monitoram métricas em tempo real

---

## 🛠️ Como Rodar

### Backend
```bash
cd backend
./mvnw spring-boot:run
