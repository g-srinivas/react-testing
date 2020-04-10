import { renderHook, act } from "@testing-library/react-hooks";
import useUndo from "./use-undo";

test("allows to undo", () => {
  const { result } = renderHook(() => useUndo("one"));

  expect(result.current.canUndo).toBe(false);
  expect(result.current.canRedo).toBe(false);
  expect(result.current.past).toEqual([]);
  expect(result.current.present).toBe("one");
  expect(result.current.future).toEqual([]);

  act(() => result.current.set("two"));

  expect(result.current.canUndo).toBe(true);
  expect(result.current.canRedo).toBe(false);
  expect(result.current.past).toEqual(["one"]);
  expect(result.current.present).toBe("two");
  expect(result.current.future).toEqual([]);

  act(() => result.current.set("three"));

  expect(result.current.canUndo).toBe(true);
  expect(result.current.canRedo).toBe(false);
  expect(result.current.past).toEqual(["one", "two"]);
  expect(result.current.present).toBe("three");
  expect(result.current.future).toEqual([]);

  act(() => result.current.undo());
  expect(result.current.canUndo).toBe(true);
  expect(result.current.canRedo).toBe(true);
  expect(result.current.past).toEqual(["one"]);
  expect(result.current.present).toBe("two");
  expect(result.current.future).toEqual(["three"]);

  act(() => {
    result.current.undo();
  });

  expect(result.current.canUndo).toBe(false);
  expect(result.current.canRedo).toBe(true);
  expect(result.current.past).toEqual([]);
  expect(result.current.present).toEqual("one");
  expect(result.current.future).toEqual(["two", "three"]);

  act(() => {
    result.current.redo();
  });
  // assert undo + undo + redo state
  expect(result.current.canUndo).toBe(true);
  expect(result.current.canRedo).toBe(true);
  expect(result.current.past).toEqual(["one"]);
  expect(result.current.present).toEqual("two");
  expect(result.current.future).toEqual(["three"]);

  act(() => {
    result.current.set("four");
  });

  expect(result.current.canUndo).toBe(true);
  expect(result.current.canRedo).toBe(false);
  expect(result.current.past).toEqual(["one", "two"]);
  expect(result.current.present).toEqual("four");
  expect(result.current.future).toEqual([]);
});
