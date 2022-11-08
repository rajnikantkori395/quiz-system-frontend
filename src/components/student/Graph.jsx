import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { useNavigate } from "react-router-dom"

const Graph = () => {
    let navigate = useNavigate();
    const [scoreData] = useState(JSON.parse(localStorage.getItem("scoreData")));
    const svgRef = useRef();

    useEffect(() => {
        //Setting up svg
        const w = 400;
        const h = 100;
        const svg = d3
            .select(svgRef.current)
            .attr("width", w)
            .attr("height", h)
            .style("background", "#50DFA1")
            .style("margin-top", "20")
            .style('overflow', 'visible')
            .style('margin-left', '20')
            .style('margin-bottom', '20')
            .style('padding-right', '20')

        //Setting the scale
        const xScale = d3
            .scaleLinear()
            .domain([0, scoreData.length - 1])
            .range([0, w]);

        const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);

        const generateScaledLine = d3
            .line()
            .x((d, i) => xScale(i))
            .y(yScale)
            .curve(d3.curveCardinal);

        //   Setting up the axes
        const xAxis = d3
            .axisBottom(xScale)
            .ticks(scoreData.length)
            .tickFormat((i) => i + 1);
        const yAxis = d3.axisLeft(yScale).ticks(5);

        svg.append("g").call(xAxis).attr("transform", `translate(0,${h})`);
        svg.append("g").call(yAxis);

        //Setting up the data for svg
        svg
            .selectAll(".line")
            .data([scoreData])
            .join("path")
            .attr("d", (d) => generateScaledLine(d))
            .attr("fill", "none")
            .attr("stroke", "black");
    }, [scoreData]);

    return (
        <>
            <div className="me-5 scoreCard">
                <h3>Score Graph</h3>
                <svg ref={svgRef}></svg>
                <br />
                <h5 className="outline-dark">Scores: {scoreData.join(',')}</h5>
            </div>
        </>
    );
};

export default Graph;