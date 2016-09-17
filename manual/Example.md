# Example

```javascript
import GPT from 'gpt-mock';

googletag = new GPT();
googletag.cmd.push(function() {
  googletag.defineSlot('/Test/12345', [728, 90], 'gpt-div-1').addService(googletag.pubads());
});

googletag.cmd.push(function() {
  googletag.display('gpt-div-1');
});

// Vitally, you need to tell the library that it has loaded so the commands
// will be executed.
googletag._loaded();
```
