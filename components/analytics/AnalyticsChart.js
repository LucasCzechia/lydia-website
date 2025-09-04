import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { useAppTheme } from '../../context/ThemeContext';

const AnalyticsChart = ({ 
  type = 'line',
  data = [],
  dataKey,
  stackId,
  xAxisKey = 'date',
  color = '#2563EB',
  secondaryColor = '#10B981',
  fillOpacity = 0.6,
  strokeWidth = 3,
  formatValue,
  formatLabel,
  valueLabel = 'Value',
  customTooltip,
  showGrid = true,
  dotSize = 4,
  activeDotSize = 6,
  barRadius = [4, 4, 0, 0],
  areaStack = false,
  secondaryDataKey,
  ...props 
}) => {
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';

  const defaultFormatValue = (value) => {
    if (!value && value !== 0) return '0';
    if (value >= 1000000000) return (value / 1000000000).toFixed(1) + 'B';
    if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
    if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
    return value.toLocaleString();
  };

  const defaultFormatLabel = (value) => {
    return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatValueFn = formatValue || defaultFormatValue;
  const formatLabelFn = formatLabel || defaultFormatLabel;

  const gridColor = isDark ? '#374151' : '#E5E7EB';
  const axisColor = isDark ? '#9CA3AF' : '#6B7280';

  const tooltipStyle = {
    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
    border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
    borderRadius: '8px',
    color: isDark ? '#FFFFFF' : '#000000'
  };

  const commonProps = {
    data,
    ...props
  };

  const xAxisProps = {
    dataKey: xAxisKey,
    stroke: axisColor,
    tick: { fontSize: 12 },
    tickFormatter: formatLabelFn
  };

  const yAxisProps = {
    stroke: axisColor,
    tick: { fontSize: 12 },
    tickFormatter: formatValueFn
  };

  const tooltipProps = customTooltip ? customTooltip : {
    contentStyle: tooltipStyle,
    labelFormatter: (value) => new Date(value).toLocaleDateString(),
    formatter: (value, name) => [formatValueFn(value), valueLabel]
  };

  const gridProps = showGrid ? {
    strokeDasharray: "3 3",
    stroke: gridColor
  } : null;

  switch (type) {
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridProps} />}
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <Tooltip {...tooltipProps} />
            <Bar 
              dataKey={dataKey}
              fill={color}
              radius={barRadius}
            />
          </BarChart>
        </ResponsiveContainer>
      );

    case 'area':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridProps} />}
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <Tooltip {...tooltipProps} />
            {areaStack && secondaryDataKey ? (
              <>
                <Area 
                  type="monotone" 
                  dataKey={dataKey}
                  stackId="1"
                  stroke={color}
                  fill={color}
                  fillOpacity={fillOpacity}
                />
                <Area 
                  type="monotone" 
                  dataKey={secondaryDataKey}
                  stackId="1"
                  stroke={secondaryColor}
                  fill={secondaryColor}
                  fillOpacity={fillOpacity}
                />
              </>
            ) : (
              <Area 
                type="monotone" 
                dataKey={dataKey}
                stroke={color}
                fill={color}
                fillOpacity={fillOpacity}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      );

    case 'line':
    default:
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid {...gridProps} />}
            <XAxis {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <Tooltip {...tooltipProps} />
            <Line 
              type="monotone" 
              dataKey={dataKey}
              stroke={color}
              strokeWidth={strokeWidth}
              dot={{ fill: color, strokeWidth: 2, r: dotSize }}
              activeDot={{ r: activeDotSize, stroke: color, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
  }
};

export default AnalyticsChart;