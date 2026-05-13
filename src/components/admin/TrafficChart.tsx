'use client';

import { useState, useRef, useCallback } from 'react';

interface DayPoint {
  date: string;
  views: number;
  sessions: number;
  forms: number;
}

interface TrafficChartProps {
  data: DayPoint[];
}

const PADDING = { top: 28, right: 16, bottom: 32, left: 48 };

export default function TrafficChart({ data }: TrafficChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    point: DayPoint;
  } | null>(null);

  const width = 800;
  const height = 280;

  const chartW = width - PADDING.left - PADDING.right;
  const chartH = height - PADDING.top - PADDING.bottom;

  const maxViews = Math.max(...data.map((d) => d.views), 1);
  const yTicks = niceYTicks(maxViews);
  const yMax = yTicks[yTicks.length - 1];

  const xScale = (i: number) => PADDING.left + (i / Math.max(data.length - 1, 1)) * chartW;
  const yScale = (v: number) => PADDING.top + chartH - (v / yMax) * chartH;

  const viewsLine = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.views)}`).join(' ');
  const areaPath = `${viewsLine} L${xScale(data.length - 1)},${yScale(0)} L${xScale(0)},${yScale(0)} Z`;

  const sessionsLine = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.sessions)}`).join(' ');

  const formsLine = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xScale(i)},${yScale(d.forms)}`).join(' ');

  const xLabels = pickXLabels(data, 8);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current || data.length === 0) return;
      const rect = svgRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const ratio = (mx - PADDING.left) / chartW;
      const idx = Math.round(ratio * (data.length - 1));
      const clamped = Math.max(0, Math.min(data.length - 1, idx));
      setTooltip({ x: xScale(clamped), y: yScale(data[clamped].views), point: data[clamped] });
    },
    [data, chartW],
  );

  const handleMouseLeave = useCallback(() => setTooltip(null), []);

  if (data.length === 0) return null;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Y grid + labels */}
        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={PADDING.left}
              x2={width - PADDING.right}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke="#e5e7eb"
              strokeWidth={1}
            />
            <text
              x={PADDING.left - 8}
              y={yScale(tick) + 4}
              textAnchor="end"
              className="fill-gray-500"
              fontSize={11}
            >
              {tick}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#areaGrad)" />
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7b2ff7" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#7b2ff7" stopOpacity={0.02} />
          </linearGradient>
        </defs>

        {/* Views line */}
        <path d={viewsLine} fill="none" stroke="#7b2ff7" strokeWidth={2.5} strokeLinejoin="round" />

        {/* Sessions line */}
        <path d={sessionsLine} fill="none" stroke="#df73ff" strokeWidth={2} strokeDasharray="6 3" strokeLinejoin="round" />

        {/* Form submissions line */}
        <path d={formsLine} fill="none" stroke="#22c55e" strokeWidth={2} strokeLinejoin="round" />

        {/* X labels */}
        {xLabels.map(({ idx, label }) => (
          <text
            key={idx}
            x={xScale(idx)}
            y={height - 6}
            textAnchor="middle"
            className="fill-gray-500"
            fontSize={11}
          >
            {label}
          </text>
        ))}

        {/* Tooltip crosshair + dot */}
        {tooltip && (
          <>
            <line
              x1={tooltip.x}
              x2={tooltip.x}
              y1={PADDING.top}
              y2={PADDING.top + chartH}
              stroke="#7b2ff7"
              strokeWidth={1}
              strokeDasharray="4 2"
              opacity={0.5}
            />
            <circle cx={tooltip.x} cy={tooltip.y} r={4} fill="#7b2ff7" />
            <circle
              cx={tooltip.x}
              cy={yScale(tooltip.point.sessions)}
              r={3.5}
              fill="#df73ff"
            />
            <circle
              cx={tooltip.x}
              cy={yScale(tooltip.point.forms)}
              r={3.5}
              fill="#22c55e"
            />
          </>
        )}
      </svg>

      {/* Tooltip card */}
      {tooltip && (
        <div
          className="pointer-events-none absolute bg-earle-black/90 text-white text-xs rounded-lg px-3 py-2 shadow-lg"
          style={{
            left: `${(tooltip.x / width) * 100}%`,
            top: 0,
            transform: 'translateX(-50%)',
          }}
        >
          <p className="font-montserrat font-semibold mb-0.5">
            {formatDateLabel(tooltip.point.date)}
          </p>
          <p className="font-raleway">
            <span className="inline-block w-2 h-2 rounded-full bg-purple mr-1" />
            Views: {tooltip.point.views}
          </p>
          <p className="font-raleway">
            <span className="inline-block w-2 h-2 rounded-full bg-phlox mr-1" />
            Sessions: {tooltip.point.sessions}
          </p>
          <p className="font-raleway">
            <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: '#22c55e' }} />
            Forms: {tooltip.point.forms}
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-6 mt-2 ml-12 text-xs text-gray-500 font-raleway">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-0.5 bg-purple rounded" /> Page Views
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-0.5 bg-phlox rounded border-dashed" style={{ borderTop: '2px dashed #df73ff', height: 0 }} /> Sessions
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-0.5 rounded" style={{ backgroundColor: '#22c55e' }} /> Form Submissions
        </span>
      </div>
    </div>
  );
}

function niceYTicks(max: number): number[] {
  if (max <= 5) return [0, 1, 2, 3, 4, 5].filter((t) => t <= max + 1);
  const step = Math.ceil(max / 5);
  const rounded = Math.ceil(step / (step < 10 ? 1 : 5)) * (step < 10 ? 1 : 5);
  const ticks: number[] = [];
  for (let v = 0; v <= max + rounded; v += rounded) {
    ticks.push(v);
    if (ticks.length >= 6) break;
  }
  return ticks;
}

function pickXLabels(data: DayPoint[], maxLabels: number) {
  if (data.length <= maxLabels) {
    return data.map((d, idx) => ({ idx, label: formatDateLabel(d.date) }));
  }
  const step = Math.ceil(data.length / maxLabels);
  const labels: { idx: number; label: string }[] = [];
  for (let i = 0; i < data.length; i += step) {
    labels.push({ idx: i, label: formatDateLabel(data[i].date) });
  }
  if (labels[labels.length - 1].idx !== data.length - 1) {
    labels.push({ idx: data.length - 1, label: formatDateLabel(data[data.length - 1].date) });
  }
  return labels;
}

function formatDateLabel(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
