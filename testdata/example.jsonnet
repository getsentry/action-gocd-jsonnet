local greeting = import 'github.com/examplecom/greeting/main.libjsonnet';
local who = 'world';

{
  'greeting.yaml': {
    [greeting]: who,
  },
}
