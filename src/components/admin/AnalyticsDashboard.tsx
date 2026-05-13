'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChartBarIcon, UsersIcon, ArrowTrendingDownIcon, DocumentTextIcon, GlobeAltIcon, ArrowPathIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import TrafficChart from './TrafficChart';

interface Summary {
  pageViews: number;
  sessions: number;
  bounceRate: number;
  avgPages: number;
  formSubmissions: number;
  daily: { date: string; views: number; sessions: number; forms: number }[];
  topPages: { path: string; count: number }[];
  topReferrers: { host: string; count: number }[];
}

type RangeOption = 30 | 60 | 90;

export default function AnalyticsDashboard() {
  const [range, setRange] = useState<RangeOption>(30);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async (days: RangeOption) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics/summary?days=${days}`);
      if (!res.ok) throw new Error('Failed to load analytics');
      const data: Summary = await res.json();
      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary(range);
  }, [range, fetchSummary]);

  if (loading) {
    return (
      <div className="space-y-6">
        <h3 className="font-montserrat text-2xl text-white">Analytics Dashboard</h3>
        <div className="flex items-center justify-center py-20">
          <ArrowPathIcon className="h-8 w-8 text-purple animate-spin" />
          <span className="ml-3 font-raleway text-white-smoke">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h3 className="font-montserrat text-2xl text-white">Analytics Dashboard</h3>
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center">
          <p className="font-raleway text-red-300">{error}</p>
          <button
            onClick={() => fetchSummary(range)}
            className="mt-3 text-sm font-montserrat text-white bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!summary || summary.pageViews === 0) {
    return (
      <div className="space-y-6">
        <h3 className="font-montserrat text-2xl text-white">Analytics Dashboard</h3>
        <div className="bg-white-smoke rounded-lg p-12 text-center">
          <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="font-montserrat text-lg font-semibold text-earle-black mb-2">
            No traffic recorded yet
          </h4>
          <p className="font-raleway text-gray-600 max-w-md mx-auto">
            Analytics tracking is now active. Visit your public site pages to start collecting
            data — it will appear here within seconds.
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Page Views',
      value: summary.pageViews.toLocaleString(),
      icon: DocumentTextIcon,
    },
    {
      label: 'Sessions',
      value: summary.sessions.toLocaleString(),
      icon: UsersIcon,
    },
    {
      label: 'Bounce Rate',
      value: `${summary.bounceRate}%`,
      icon: ArrowTrendingDownIcon,
    },
    {
      label: 'Avg Pages / Session',
      value: summary.avgPages.toString(),
      icon: ChartBarIcon,
    },
    {
      label: 'Form Submissions',
      value: summary.formSubmissions.toLocaleString(),
      icon: EnvelopeIcon,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="font-montserrat text-2xl text-white">Analytics Dashboard</h3>
        <div className="flex items-center gap-1 bg-earle-black/40 rounded-lg p-1">
          {([30, 60, 90] as RangeOption[]).map((d) => (
            <button
              key={d}
              onClick={() => setRange(d)}
              className={`px-4 py-1.5 rounded-md text-sm font-montserrat font-medium transition-colors ${
                range === d
                  ? 'bg-purple text-white'
                  : 'text-white-smoke hover:text-white hover:bg-purple/20'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white-smoke rounded-lg p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-purple/15 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-purple" />
                </div>
                <h4 className="font-montserrat text-sm font-semibold text-earle-black uppercase tracking-wide">
                  {s.label}
                </h4>
              </div>
              <p className="font-montserrat text-3xl font-bold text-earle-black">{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-white-smoke rounded-lg p-6 relative">
        <h4 className="font-montserrat text-sm font-semibold text-earle-black uppercase tracking-wide mb-4">
          Daily Traffic
        </h4>
        <TrafficChart data={summary.daily} />
      </div>

      {/* Top Pages & Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white-smoke rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <DocumentTextIcon className="h-5 w-5 text-purple" />
            <h4 className="font-montserrat text-sm font-semibold text-earle-black uppercase tracking-wide">
              Top Pages
            </h4>
          </div>
          {summary.topPages.length === 0 ? (
            <p className="font-raleway text-sm text-gray-500">No data yet</p>
          ) : (
            <ul className="space-y-2">
              {summary.topPages.map((p, i) => (
                <li key={p.path} className="flex items-center justify-between">
                  <span className="font-raleway text-sm text-earle-black truncate max-w-[70%]">
                    <span className="text-gray-400 mr-2 font-montserrat text-xs">{i + 1}.</span>
                    {p.path}
                  </span>
                  <span className="font-montserrat text-sm font-semibold text-purple">
                    {p.count.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Top Referrers */}
        <div className="bg-white-smoke rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <GlobeAltIcon className="h-5 w-5 text-purple" />
            <h4 className="font-montserrat text-sm font-semibold text-earle-black uppercase tracking-wide">
              Top Referrers
            </h4>
          </div>
          {summary.topReferrers.length === 0 ? (
            <p className="font-raleway text-sm text-gray-500">
              No external referrers recorded yet
            </p>
          ) : (
            <ul className="space-y-2">
              {summary.topReferrers.map((r, i) => (
                <li key={r.host} className="flex items-center justify-between">
                  <span className="font-raleway text-sm text-earle-black truncate max-w-[70%]">
                    <span className="text-gray-400 mr-2 font-montserrat text-xs">{i + 1}.</span>
                    {r.host}
                  </span>
                  <span className="font-montserrat text-sm font-semibold text-purple">
                    {r.count.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
