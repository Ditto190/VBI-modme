import { scatterLoop } from "src/pipeline/spec/chart/pipes/animation/scatter";

describe("scatter animation", () => {
  it("should use point size channel for breath atmosphere", () => {
    const result = scatterLoop(
      {
        enable: true,
        interval: 2,
        atmosphere: { effect: "breath", ease: "linear" },
      },
      false,
    ) as any;
    const breath = result.point[0];

    expect(breath.channel.scaleX).toBeUndefined();
    expect(breath.channel.scaleY).toBeUndefined();
    expect(breath.channel.size.from(null, { attribute: { size: 20 } })).toBe(
      16,
    );
    expect(breath.channel.size.to(null, { attribute: { size: 20 } })).toBe(24);
  });
});
