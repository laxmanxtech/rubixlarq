import { useState, useCallback, useRef } from 'react'
import { stateTo3x3FaceletString, convert2x2To3x3Facelets } from '../utils/colorMap'
import { parseAlgorithm, invertAlgorithm } from '../utils/moveParser'
import { groupMovesFor3x3, groupMovesFor2x2, flattenStagesToSteps } from '../utils/stageGrouper'
import { validate3x3, validate2x2 } from '../utils/cubeValidator'

/**
 * useSolver — handles solving the cube and managing step-by-step navigation.
 */
export function useSolver(cubeType = '3x3') {
  const [status, setStatus] = useState('idle') // 'idle' | 'validating' | 'solving' | 'solved' | 'error'
  const [errors, setErrors] = useState([])
  const [steps, setSteps] = useState([])      // flat list of all steps
  const [stages, setStages] = useState([])    // grouped stages
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [solutionAlg, setSolutionAlg] = useState('')    // full solution string
  const [setupAlg, setSetupAlg] = useState('')          // inverted solution (for TwistyPlayer)
  const cubejsRef = useRef(null)  // caches the Cube class after first load

  // Lazy-load cubejs solver (only when first needed)
  const initSolver = useCallback(async () => {
    if (cubejsRef.current) return cubejsRef.current   // return cached class, not `true`
    try {
      const mod = await import('cubejs')
      const Cube = mod.default ?? mod  // handle Vite CJS interop: try .default first, then mod itself
      if (typeof Cube.initSolver !== 'function') {
        throw new Error('cubejs loaded but initSolver not found — CJS interop issue')
      }
      Cube.initSolver()
      cubejsRef.current = Cube
      return Cube
    } catch (err) {
      console.error('Solver init error:', err)
      return null
    }
  }, [])

  const solve = useCallback(async (stateByFace) => {
    setStatus('validating')
    setErrors([])

    // Validate
    const validation = cubeType === '2x2'
      ? validate2x2(stateByFace)
      : validate3x3(stateByFace)

    if (!validation.valid) {
      setErrors(validation.errors)
      setStatus('error')
      return
    }

    setStatus('solving')

    try {
      if (cubeType === '3x3') {
        const Cube = await initSolver()
        if (!Cube) throw new Error('Could not load solver.')

        const facelets = stateTo3x3FaceletString(stateByFace)
        const cube = Cube.fromString(facelets)

        if (cube.isSolved()) {
          // Already solved!
          setSteps([])
          setStages([])
          setSolutionAlg('')
          setSetupAlg('')
          setStatus('solved')
          return
        }

        const solution = cube.solve()

        const moveList = parseAlgorithm(solution)
        const groupedStages = groupMovesFor3x3(moveList)
        const flatSteps = flattenStagesToSteps(groupedStages)
        const inverted = invertAlgorithm(solution)

        setSolutionAlg(solution)
        setSetupAlg(inverted)
        setStages(groupedStages)
        setSteps(flatSteps)
        setCurrentStepIndex(0)
        setStatus('solved')

      } else {
        // 2x2 — map corners onto a 3x3 (with solved edges) and use cubejs
        const Cube = await initSolver()
        if (!Cube) throw new Error('Could not load solver.')

        const facelets3x3 = convert2x2To3x3Facelets(stateByFace)
        const cube = Cube.fromString(facelets3x3)

        if (cube.isSolved()) {
          setSteps([])
          setStages([])
          setSolutionAlg('')
          setSetupAlg('')
          setStatus('solved')
          return
        }

        const solution = cube.solve()
        const moveList = parseAlgorithm(solution)
        const groupedStages = groupMovesFor2x2(moveList)
        const flatSteps = flattenStagesToSteps(groupedStages)
        const inverted = invertAlgorithm(solution)

        setSolutionAlg(solution)
        setSetupAlg(inverted)
        setStages(groupedStages)
        setSteps(flatSteps)
        setCurrentStepIndex(0)
        setStatus('solved')
      }
    } catch (err) {
      console.error('Solve error:', err)
      setErrors([`Solve failed: ${err.message}. Please check your cube colors and try again.`])
      setStatus('error')
    }
  }, [cubeType, initSolver])

  const goToStep = useCallback((index) => {
    setCurrentStepIndex(Math.max(0, Math.min(index, steps.length - 1)))
  }, [steps.length])

  const nextStep = useCallback(() => {
    setCurrentStepIndex(prev => Math.min(prev + 1, steps.length - 1))
  }, [steps.length])

  const prevStep = useCallback(() => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0))
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setErrors([])
    setSteps([])
    setStages([])
    setCurrentStepIndex(0)
    setSolutionAlg('')
    setSetupAlg('')
  }, [])

  const currentStep = steps[currentStepIndex] || null

  // Algorithm string for TwistyPlayer up to current step
  const algUpToCurrentStep = steps
    .slice(0, currentStepIndex + 1)
    .map(s => s.move)
    .join(' ')

  return {
    status,
    errors,
    steps,
    stages,
    currentStep,
    currentStepIndex,
    totalSteps: steps.length,
    solutionAlg,
    setupAlg,
    algUpToCurrentStep,
    solve,
    goToStep,
    nextStep,
    prevStep,
    reset,
    isSolving: status === 'solving' || status === 'validating',
    isSolved: status === 'solved',
    isError: status === 'error',
    isIdle: status === 'idle',
  }
}
