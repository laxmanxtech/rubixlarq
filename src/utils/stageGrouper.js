// Groups a flat list of moves into named stages for display
// The Kociemba solver returns an optimal solution — we label stages by dividing moves

/**
 * Named stages for 3x3 Layer-by-Layer display.
 * We divide the solution into these conceptual stages.
 */
const STAGES_3X3 = [
  { name: 'White Cross',    description: 'Forming the white cross on the top face' },
  { name: 'White Corners',  description: 'Completing the white (top) layer' },
  { name: 'Middle Layer',   description: 'Solving the middle layer edges' },
  { name: 'Yellow Cross',   description: 'Orienting the top face yellow cross' },
  { name: 'Orient Corners', description: 'Getting all yellow stickers to face up' },
  { name: 'Corner Positions', description: 'Moving corners to their correct positions' },
  { name: 'Edge Positions', description: 'Final step — placing the last edges' },
]

const STAGES_2X2 = [
  { name: 'Bottom Layer',   description: 'Solving the bottom layer corners' },
  { name: 'Orient Top',     description: 'Making all yellow stickers face up' },
  { name: 'Permute Top',    description: 'Moving top corners to correct positions' },
]

/**
 * Split an array of moves into groups of roughly equal size for given stage count.
 * Returns an array of { stageName, stageDesc, moves: string[], startIndex, endIndex }
 */
function divideMovesIntoStages(moves, stageDefinitions) {
  if (!moves || moves.length === 0) return []

  const stageCount = stageDefinitions.length
  const totalMoves = moves.length

  // Distribute moves across stages — last stage gets any remainder
  const baseSize = Math.floor(totalMoves / stageCount)
  const remainder = totalMoves % stageCount

  const stages = []
  let cursor = 0

  for (let i = 0; i < stageCount; i++) {
    const size = baseSize + (i < remainder ? 1 : 0)
    if (cursor >= totalMoves) break  // skip empty trailing stages

    const stageMoves = moves.slice(cursor, cursor + size)
    if (stageMoves.length === 0) continue

    stages.push({
      id: i,
      name: stageDefinitions[i].name,
      description: stageDefinitions[i].description,
      moves: stageMoves,
      startMoveIndex: cursor,
      endMoveIndex: cursor + stageMoves.length - 1,
    })
    cursor += size
  }

  return stages
}

/**
 * Group a solution algorithm into stages for a 3x3 cube.
 * @param {string[]} moves - Array of move strings
 * @returns {Stage[]}
 */
export function groupMovesFor3x3(moves) {
  return divideMovesIntoStages(moves, STAGES_3X3)
}

/**
 * Group a solution algorithm into stages for a 2x2 cube.
 * @param {string[]} moves - Array of move strings
 * @returns {Stage[]}
 */
export function groupMovesFor2x2(moves) {
  return divideMovesIntoStages(moves, STAGES_2X2)
}

/**
 * Flatten stages back to a flat move list with stage info attached to each move.
 * Useful for step-by-step navigation.
 * Returns: [{ move, stageId, stageName, moveIndexInStage, globalMoveIndex }, ...]
 */
export function flattenStagesToSteps(stages) {
  const steps = []
  for (const stage of stages) {
    stage.moves.forEach((move, i) => {
      steps.push({
        move,
        stageId: stage.id,
        stageName: stage.name,
        stageDescription: stage.description,
        moveIndexInStage: i,
        totalMovesInStage: stage.moves.length,
        globalMoveIndex: stage.startMoveIndex + i,
      })
    })
  }
  return steps
}
