export const jobSourceStatus = {
  automatic: null,
  manual:
    'Because this job source does not follow a standard format we can only update it monthly. <a target="_blank" href="https://help.getro.com/support/solutions/articles/65000168381-how-to-ensure-your-job-postings-are-updated-daily">Learn more</a>.',
  brand_new: 'Our team is working on configuring this job source, which should take no more than 2 business days.',
  requires_verification:
    'Our team is reviewing an issue with the job source. It should be resolved within 2 business days. ',
  errored: 'Our team detected an out of the ordinary issue with the job source. We are working hard to resolve this.',
  unidentifiable: 'We cannot locate where this company post their jobs. Click Edit above to submit a valid job source.',
  bypassed:
    'Jobs cannot be extracted programmatically and there are too many jobs to extract them manually. <a target="_blank" href="https://help.getro.com/support/solutions/articles/65000168381-how-to-ensure-your-job-postings-are-updated-daily">Learn more</a>.',
};
