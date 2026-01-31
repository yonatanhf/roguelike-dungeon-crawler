# ⌬ Agentic Dungeon Crawler: A Living Lab

Welcome to a new era of this project. What was once a legacy React 15 FCC dungeon crawler has been completely reborn as an **experimental laboratory for agentic endeavors**.

## 🧬 Why Start Again?

The software landscape has fundamentally shifted. It is time to move beyond deterministic loops and embrace the **Agentic Idea**. This project is a "refresh" designed to explore how decentralized intelligence, memory enhancement, and autonomous orchestration can transform a simple game into a living, adapting environment.

## 🧪 The Laboratory

This project is a playground for exploring the intersection of gaming and **Agentic AI**. We are building a system where:
- **Dungeons are Living Entities:** Environments that adapt and mutate based on every new event.
- **Orchestration > Logic:** Using patterns like **OpenClaw** to decouple decision-making from execution.
- **Academic Exploration:** We will use this lab to test theories such as *Swarm Intelligence*, *Active Inference*, and *Episodic Memory Retrieval* in a real-time, interactive setting.

## 🏗️ Architecture (OpenClaw Heart)

We follow a modular, microservices-based approach:

1.  **The Neural Terminal (Frontend):**
    - Built with **Vite, React 18, TypeScript, and TailwindCSS**.
    - A high-fidelity "dumb terminal" that visualizes the state provided by the orchestrator.
2.  **The Neural Core (Backend):**
    - Built with **FastAPI (Python)**.
    - **Orchestrator:** The `DungeonMaster` manages the game loop and entity behaviors.
    - **Agentic Logic:** Support for local LLMs via `llama-server` to generate real-time narrative.
    - **Swarm Ready:** A pluggable engine for testing collective intelligence algorithms.

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- (Optional) [llama.cpp](https://github.com/ggerganov/llama.cpp) running `llama-server` on port 8080.

### Running the Lab
```bash
docker-compose up --build
```
- **Terminal UI:** [http://localhost:5173](http://localhost:5173)
- **Core API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

## 🤝 Open Contribution

**Everyone is welcome to contribute.** 

Whether you are interested in refining the game mechanics, implementing new swarm algorithms, or integrating the latest academic principles of agentic AI, your input is valuable. This is as much a research project as it is a game.

---

## 🛠️ Reliability & Pipeline

- **CI:** Automated linting (Ruff/Vite) and testing (Pytest) on every PR.
- **CD:** Automated releases and Docker builds on version tags.
- **Health:** Docker health checks monitor the Neural Core status.

## 🗺️ Roadmap & Theories
- **Episodic Memory:** Integrating Vector DBs (Chroma/Pinecone) to allow the dungeon to "remember" player history.
- **Active Inference:** Exploring surprise-minimization as a driver for monster behavior.
- **Swarm Intelligence:** Implementing decentralized entity coordination.
- **Multi-Agent Orchestration:** Moving from a single DM to a committee of agents.

## 📄 License & Usage

**CC-BY-NC-4.0 (Creative Commons Attribution-NonCommercial 4.0)**

This project is an open experiment and laboratory.
*   **Contribution:** You are free (and encouraged!) to fork, modify, and contribute back to this repository.
*   **Attribution:** Any use of this code or concepts must provide clear attribution to the original "Agentic Dungeon Crawler" project.
*   **Commercial Use:** You **may not** use this material for commercial purposes (e.g., selling the game, wrapping it in a paid service) without explicit written permission from the authors.

*If you wish to use this codebase for a commercial or proprietary project, please open an issue to discuss a custom license.*

*Join us in exploring the limits of the agentic world.*
