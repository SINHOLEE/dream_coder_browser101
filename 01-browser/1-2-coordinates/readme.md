## 좌표체계(coordinate)

- (x,y)로 표현된다.
- innerScreen? document.client?의 좌측 상단에서 시작한다.
- 밑으로 내려갈수록 y가 커지고, 우측으로 갈수록 x가 커진다.
- 좌표를 알 수 있는 방법: Element.getBoundingClientRect() (left, top, width, height 등) 정보를 알 수 있다.
- 주의: css의 right, bottom은 각각 우측과 하단으로부터 얼마나 떨어져있는지를 나타내는 반면, js에서의 right, bottom은 좌측과 상단에서부터 얼마나 떨어져있는지를 나타내는 것이다.

#### client x,y VS page x,y

-
