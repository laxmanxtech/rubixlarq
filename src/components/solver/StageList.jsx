export default function StageList({ stages, currentStep }) {
  const currentStageId = currentStep?.stageId ?? -1

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
        <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
          Solution Stages
        </p>
      </div>
      <div className="divide-y divide-[#F1F5F9]">
        {stages.map((stage) => {
          const isActive = stage.id === currentStageId
          const isDone = stage.id < currentStageId
          return (
            <div
              key={stage.id}
              className={`px-4 py-3 flex items-start gap-3 transition-colors ${
                isActive ? 'bg-[#EEF2FF]' : isDone ? 'bg-emerald-50/50' : ''
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                isDone
                  ? 'bg-[#10B981] text-white'
                  : isActive
                    ? 'bg-[#1B4FDB] text-white'
                    : 'bg-[#E2E8F0] text-[#94A3B8]'
              }`}>
                {isDone ? '✓' : stage.id + 1}
              </div>
              <div className="min-w-0">
                <p className={`text-sm font-semibold leading-snug ${
                  isActive ? 'text-[#1B4FDB]' : isDone ? 'text-[#10B981]' : 'text-[#64748B]'
                }`}>
                  {stage.name}
                </p>
                <p className="text-xs text-[#94A3B8] mt-0.5 leading-snug">
                  {stage.moves.length} move{stage.moves.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
