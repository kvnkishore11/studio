"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } 

// Removed ChartConfig type definition

// Removed ChartContextProps type definition

const ChartContext = React.createContext(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId()
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
            className
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer>
            {children}
          </RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    )
  }
)
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }) => { // Removed type annotations
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme] || // Removed type assertion
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label]?.label || label // Removed type assertion
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "my-0.5": nestLabel && indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } // Removed type assertion
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef(
  ({ name, className, ...props }, ref) => { // Removed type annotations
    const { config } = useChart()

    if (!config || !config[name]) {
      return null
    }

    const itemConfig = config[name]

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-end gap-1.5 text-muted-foreground",
          className
        )}
      >
        {itemConfig.icon ? (
          <itemConfig.icon className="h-3 w-3" />
        ) : (
          <div
            className="h-2 w-2 shrink-0 rounded-[2px]"
            style={{
              backgroundColor: itemConfig.color,
            }}
          />
        )}
        {itemConfig.label}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to sync gradients with container width/height
const ChartStyleContext = React.createContext(null)

function useChartStyle() {
  const context = React.useContext(ChartStyleContext)

  if (!context) {
    throw new Error("useChartStyle must be used within a <ChartStyleProvider />")
  }

  return context
}

function ChartStyleProvider({ value, children }) {
  return (
    <ChartStyleContext.Provider value={value}>
      {children}
    </ChartStyleContext.Provider>
  )
}

const ChartArea = React.forwardRef((props, ref) => { // Removed type annotations
  const { activeDot = true, fillOpacity = 0.1 } = props // Removed type annotations
  const { id } = useChartStyle()

  return (
    <RechartsPrimitive.Area
      ref={ref}
      type="natural"
      fill={`url(#${id}-gradient)`}
      fillOpacity={fillOpacity}
      stroke={`url(#${id}-color)`}
      strokeWidth={2}
      activeDot={
        activeDot
          ? (props) => {
              return (
                <RechartsPrimitive.Dot
                  {...props}
                  r={4}
                  fill="var(--color-background)"
                  strokeWidth={2}
                />
              )
            }
          : undefined
      }
      {...props}
    />
  )
})
ChartArea.displayName = "ChartArea"

const ChartBar = React.forwardRef((props, ref) => { // Removed type annotations
  const { activeBar = true, radius = 0, fillOpacity = 0.8 } = props // Removed type annotations
  const { id } = useChartStyle()

  return (
    <RechartsPrimitive.Bar
      ref={ref}
      fill={`var(--color-${id})`}
      fillOpacity={fillOpacity}
      radius={radius}
      activeBar={
        activeBar
          ? (props) => {
              return (
                <RechartsPrimitive.Rectangle
                  {...props}
                  fillOpacity={1}
                  strokeWidth={1}
                />
              )
            }
          : undefined
      }
      {...props}
    />
  )
})
ChartBar.displayName = "ChartBar"

const ChartLine = React.forwardRef((props, ref) => { // Removed type annotations
  const { activeDot = true, type = "natural" } = props // Removed type annotations
  const { id } = useChartStyle()

  return (
    <RechartsPrimitive.Line
      ref={ref}
      stroke={`var(--color-${id})`}
      strokeWidth={2}
      type={type}
      dot={false}
      activeDot={
        activeDot
          ? (props) => (
            <RechartsPrimitive.Dot
              r={4}
              fill="var(--color-background)"
              strokeWidth={2}
              {...props}
            />
          )
          : false
      }
      {...props}
    />
  )
})
ChartLine.displayName = "ChartLine"

const ChartDots = React.forwardRef((props, ref) => { // Removed type annotations
  const { fillOpacity = 0 } = props // Removed type annotations
  const { id } = useChartStyle()

  return (
    <RechartsPrimitive.Line
      ref={ref}
      stroke="transparent"
      strokeOpacity={0}
      type="natural"
      fill={`var(--color-${id})`}
      fillOpacity={fillOpacity}
      strokeWidth={2}
      activeDot={(props) => (
        <RechartsPrimitive.Dot
          r={4}
          fill="var(--color-background)"
          strokeWidth={2}
          {...props}
        />
      )}
      {...props}
    />
  )
})
ChartDots.displayName = "ChartDots"

const ChartPie = React.forwardRef((props, ref) => { // Removed type annotations
  const { activeShape } = props // Removed type annotations

  return (
    <RechartsPrimitive.Pie
      ref={ref}
      dataKey="value"
      strokeWidth={2}
      activeShape={activeShape}
      {...props}
    />
  )
})
ChartPie.displayName = "ChartPie"

const ChartGradient = ({ id, color }) => { // Removed type annotations
  return (
    <defs>
      <linearGradient id={`${id}-gradient`} x1="0" y1="0" x2="0" y2="1">
        <stop
          offset="5%"
          stopColor={color ? `var(--color-${color})` : "hsl(var(--foreground))"}
          stopOpacity={0.8}
        />
        <stop
          offset="95%"
          stopColor={color ? `var(--color-${color})` : "hsl(var(--foreground))"}
          stopOpacity={0.1}
        />
      </linearGradient>
      <linearGradient id={`${id}-color`} x1="0" y1="0" x2="0" y2="1">
        <stop
          offset="5%"
          stopColor={color ? `var(--color-${color})` : "hsl(var(--foreground))"}
          stopOpacity={1}
        />
        <stop
          offset="95%"
          stopColor={color ? `var(--color-${color})` : "hsl(var(--foreground))"}
          stopOpacity={1}
        />
      </linearGradient>
    </defs>
  )
}

// Helper function to identify payload properties for chart tooltips and legends.
function getPayloadConfigFromPayload(
  config, // Removed type annotation
  payload, // Removed type annotation
  key // Removed type annotation
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey/*: string | undefined*/ = key // Removed type annotation

  if (
    key in payload &&
    typeof payload[key] === "string" // Removed type assertion
  ) {
    configLabelKey = payload[key] // Removed type assertion
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === "string" // Removed type assertion
  ) {
    configLabelKey = payloadPayload[key] // Removed type assertion
  }

  return configLabelKey && configLabelKey in config
    ? config[configLabelKey]
    : config.default
}

export {
  ChartArea,
  ChartBar,
  ChartContainer,
  ChartDots,
  ChartGradient,
  ChartLegend,
  ChartLegendContent,
  ChartLine,
  ChartPie,
  ChartStyleProvider,
  ChartTooltip,
  ChartTooltipContent,
  useChart,
} 