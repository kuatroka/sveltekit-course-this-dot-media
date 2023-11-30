<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Chart, Svg, Axis, Bars, Group, LinearGradient, Arc, Text } from 'layerchart';
    let value = 75;
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-2">

<Card.Root class="w-full">
    <Card.Header>
        <Card.Title>Card Title
        </Card.Title>

    </Card.Header>
    <Card.Content>
        <div class="h-[120px] border rounded">
            <Chart>
                <Svg>
                <Group center>
                    <Group y={16}>
                    <LinearGradient
                        stops={["hsl(80 100% 50%)", "hsl(200 100% 50%)"]}
                        let:url
                    >
                        <Arc
                        {value}
                        range={[-120, 120]}
                        outerRadius={60}
                        innerRadius={50}
                        cornerRadius={5}
                        spring
                        let:value
                        fill={url}
                        track={{ fill: "none", stroke: "hsl(0 0% 0% / 10%)" }}
                        >
                        <Text
                            value={Math.round(value) + "%"}
                            textAnchor="middle"
                            verticalAnchor="middle"
                            class="text-3xl tabular-nums"
                        />
                        </Arc>
                    </LinearGradient>
                    </Group>
                </Group>
                </Svg>
            </Chart>
            </div>
        </Card.Content>

    <Card.Footer>
        <p>Card Footer</p>
    </Card.Footer>
</Card.Root>

<Card.Root class="w-full">
    <Card.Header>
        <Card.Title>Card Title
        </Card.Title>
        <Card.Description>
            Card Description
        </Card.Description>
    </Card.Header>
    <Card.Content>
        <p>Card Content</p>
    </Card.Content>
    <Card.Footer>
        <p>Card Footer</p>
    </Card.Footer>
</Card.Root>
<Card.Root class="w-full">
    <Card.Header>
        <Card.Title>Card Title
        </Card.Title>
        <Card.Description>
            Card Description
        </Card.Description>
    </Card.Header>
    <Card.Content>
        <p>Card Content</p>
    </Card.Content>
    <Card.Footer>
        <p>Card Footer</p>
    </Card.Footer>
</Card.Root>

<Card.Root class="w-full">
    <Card.Header>
        <Card.Title>Card Title
        </Card.Title>
        <Card.Description>
            Card Description
        </Card.Description>
    </Card.Header>
    <Card.Content>
        <p>Card Content</p>
    </Card.Content>
    <Card.Footer>
        <p>Card Footer</p>
    </Card.Footer>
</Card.Root>
</div>

