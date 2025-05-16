# 20 Questions Game

A modern implementation of the classic "20 Questions" game where players try to guess a famous person by asking yes/no questions. The game combines deductive reasoning with knowledge of popular culture and historical figures.

## How to Play

1. The computer randomly selects a famous person from its database
2. The player can ask up to 20 yes/no questions to try to identify the person
3. After each question, the computer will respond with either "Yes" or "No"
4. The player can make a guess at any time
5. The game ends when either:
   - The player correctly guesses the person
   - The player uses all 20 questions without a correct guess
   - The player makes an incorrect final guess

## Code Structure

The application uses a modern web stack with real-time communication between client and server:

### Application Architecture
- **Node.js/Express Backend**
  - WebSocket server handling real-time game state updates, game initialization, and user management
  - `src/server/data.json`: JSON database of famous personalities

- **React Frontend**
  - Component-based UI architecture
  - Real-time game state management using Redux
  - WebSocket integration for instant server communication

- **WebSocket Integration**
  - Bidirectional communication using Socket.io
  - Real-time state updates
  - Event-based game flow management
