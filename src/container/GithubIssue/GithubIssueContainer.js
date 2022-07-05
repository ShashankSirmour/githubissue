import { GithubIssueTemplate } from '@components/templates';
import { initIssuesDataRequest } from '@store/issue';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function GithubIssueContainer() {
  const { data, loading, end } = useSelector((state) => state.issue);
  const dispatch = useDispatch();

  const loadMore = useCallback(() => {
    if (!loading && !end) dispatch(initIssuesDataRequest());
  }, [loading]);

  return (
    <GithubIssueTemplate
      data={data}
      loading={loading}
      loadMore={loadMore}
      end={end}
    />
  );
}
