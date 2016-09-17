/**
 * The command array accepts a sequence of functions and invokes them in order.
 * It is intended to replace a standard array that is used to enqueue functions
 * to be invoked once GPT is loaded.
 */
export default class CommandArray {
  /**
   * Creates a new {@link CommandArray}.
   *
   * @param {Array<function()>} commands The commands to execute
   */
  constructor(commands) {
    this._count = 0;
    for (let f of commands) {
      this.push(f);
    }
  }

  /**
   * Executes the sequence of functions specified in the arguments in order.
   *
   * @param {function()} f A JavaScript function to be executed.
   * @returns {number} The number of commands processed so far. This is
   * compatible with {@link Array#push}'s return value (the current length of the array).
   */
  push(f) {
    if (f != null && typeof f === 'function') {
      f();
      this._count += 1;
    }
    return this._count;
  }
}
