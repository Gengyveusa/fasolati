const scenarios = {
  missing: {
    oral: 'No comparable pair of samples', gut: 'Not measured', host: 'Not measured',
    status: 'Not interpretable yet', title: 'Missing data stays missing.',
    reading: 'Without comparable observations, there is no defensible trend. The interface should say that rather than estimate a result.',
    next: 'What specimen, timing, and repeatability requirements would make a comparison meaningful?',
    boundary: 'A model cannot supply a measurement that was never taken. “Unknown” is a legitimate output, not a failure to be concealed.'
  },
  local: {
    oral: 'Lower activity in a fictional follow-up sample', gut: 'Not measured', host: 'Not measured',
    status: 'Local observation only', title: 'A local change is not a systemic result.',
    reading: 'Even a repeatable local change would not establish what reached the circulation or how another tissue responded.',
    next: 'Could dilution, sample handling, or residual rinse interference explain the difference before assigning it a biological meaning?',
    boundary: 'An oral-sample observation cannot be converted into reduced cardiovascular, neurological, or cancer risk without separate validation.'
  },
  discordant: {
    oral: 'Lower activity in a fictional follow-up sample', gut: 'Source contribution unknown', host: 'A separate marker moves in the other direction',
    status: 'Discordance preserved', title: 'Disagreement is information.',
    reading: 'Averaging these channels could hide a meaningful discrepancy. Show the separate observations and the uncertainty around each one.',
    next: 'Are timing, measurement variation, and competing sources sufficient to explain the disagreement?',
    boundary: 'Neither channel proves the cause of the other. A single reassuring number would erase the very question the research needs to investigate.'
  }
};
document.querySelectorAll('.board-demo').forEach(demo => {
  demo.querySelector('.demo-controls').hidden = false;
  const buttons = [...demo.querySelectorAll('[data-scenario]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    const scenario = scenarios[button.dataset.scenario];
    if (!scenario) return;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    for (const [key, value] of Object.entries(scenario)) {
      const target = demo.querySelector(`[data-demo="${key}"]`);
      if (target) target.textContent = value;
    }
  }));
});
