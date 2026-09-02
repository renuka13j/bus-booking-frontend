const steps = ['Search', 'Select Seats', 'Passenger Details', 'Confirm'];

function BookingStepper({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-6 overflow-x-auto pb-1">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isDone = stepNumber < currentStep;

        return (
          <div key={step} className="flex items-center shrink-0">
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition
                  ${isDone
                    ? 'bg-gold-500 text-navy-950'
                    : isActive
                    ? 'bg-gold-500/20 text-gold-500 border border-gold-500'
                    : 'bg-navy-800 text-slate-500 border border-navy-700'
                  }`}
              >
                {isDone ? '✓' : stepNumber}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  isActive || isDone ? 'text-cream' : 'text-slate-500'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-6 sm:w-10 h-px mx-2 ${isDone ? 'bg-gold-500' : 'bg-navy-700'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BookingStepper;