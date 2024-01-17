<script lang="ts">
    import {scaleTime } from 'd3-scale';
    import { flatGroup } from 'd3-array';
    import { format as formatDate } from 'date-fns';
    import { PeriodType, format } from 'svelte-ux';
    import {Chart,  Svg, Axis, Area, Tooltip, TooltipItem, Highlight} from 'layerchart'
    import { createDateSeries } from '../../../../../node_modules/layerchart/dist/utils/genData';

    const data = createDateSeries({ count: 30, min: 50, max: 100, value: 'integer' });
</script>


<div class="h-[330px] p-4 border rounded">
<Chart
    {data}
    x="date"
    xScale={scaleTime()}
    y="value"
    yDomain={[0, null]}
    yNice
    padding={{ left: 16, bottom: 24 }}
    tooltip
>
    <Svg>
    <Axis placement="left" grid rule />
    <Axis
        placement="bottom"
        format={(d) => format(d, PeriodType.Day, "short")}
        rule
    />
    <Area
        line={{ class: "stroke-2 stroke-chart" }}
        class="fill-chart/30"
    />
    <Highlight points lines />
    </Svg>
    <Tooltip header={(data) => formatDate(data.date, "eee, MMMM do")} let:data>
    <TooltipItem label="value" value={data.value} />
    </Tooltip>
</Chart>
</div>

