BEGIN;

INSERT INTO rotation_users (username, email, password)
VALUES
    ('user', 'user@test.com', '1234'),
    ('rajDawg', 'sleepyLife@gmail.com', 'Bones4Days'),
    ('sunnyD', 'daniellekryce@gmail.com', 'violin4268');

INSERT INTO rotation_exchanges (created_by, title, description)
VALUES
    ( 1, 'The Roots', 'The quintessential hip-hop band'),
    ( 1, 'Kiwi/Aussie Rock', 
    'As if there wasn''t enough to make us like New Zealand and Australia already, I find their music especially attractive. I want to go live there for a little bit and see what the scene is like.'),
    ( 1, 'Bark bark woof', ''),
    ( 1, 'My influences', ''),
    ( 1, 'Wedding songs', '');

INSERT INTO rotation_songs (exchange_id, title, artist, album, added_by, url_link)
VALUES
    ( 1, 'Do you want more?!?!', 'The Roots', 'Do you want more?!?!', 1, 'https://open.spotify.com/track/5ARbffPBebPAWhtgpod3WF?si=eM38AWZUTj-cs5tV6VKlMw'),
    ( 1, 'Lazy Afternoon', 'The Roots', 'Do you want more?!?!', 2, 'https://open.spotify.com/track/0dnX3Wa1SrhZht7DUSr3dr?si=vScg9vmVTV-7MOLvwoK2aw'),
    ( 1, 'Understand', 'The Roots', '', 1, 'https://open.spotify.com/track/2kjp2kzeWPgttXbtPFniq9?si=KSVtZgO1RxWdHBusgtefsQ'),
    ( 2, 'Future Me Hates Me', 'The Beths', 'Future Me Hates Me', 1, 'https://open.spotify.com/track/0hY72avNehvdV7YVBEH4oo?si=jKpnuGJRQviVN0K1f_cFTw'),
    ( 2, 'Pedestrian At Best', 'Courtney Barnett', '', 2, 'https://open.spotify.com/track/7gsn3NxWLA0s0g9TmQlMri?si=58WNFnEsQhGFOgJrxSd2nQ'),
    ( 2, 'Elevator Operator', 'Courtney Barnett', '', 3, 'https://open.spotify.com/track/392izppyEXgN3SZChBgRb4?si=Efce8dlCSDmiK95U5GN0mA'),
    ( 3, 'Gin N Juice', 'Snoop Dogg', 'Doggystyle', 1, 'https://open.spotify.com/track/7sPt2cfrg7DrVP52zfvS1i?si=I_yuHDahSQ2GquhmJm_mlA'),
    ( 3, 'Dog Days Are Over', 'Florence + The Machine', 'Lungs', 3, 'https://open.spotify.com/track/1YLJVmuzeM2YSUkCCaTNUB?si=LPeNG6dIQbKrFXFYJEKrlA'),
    ( 3, 'Where''d all the time go?', 'Dr. Dog', 'Shame, Shame', 1, 'https://open.spotify.com/track/0UV5zxRMz6AO4ZwUOZNIKI?si=_gyRK-3FRiyAgLyXpmE7jA'),
    ( 4, 'Kick It To Me', 'Sammy Rae', 'The Good Life', 3, 'https://open.spotify.com/track/5omukHtcJduzkSfOlze4iB?si=xI-WKKhjQ06UgmtSg1_xbw'),
    ( 4, 'Sisyphus', 'Andrew Bird', 'My Finest Work Yet', 1, 'https://open.spotify.com/track/403vzOZN0tETDpvFipkNIL?si=OScHidZAQq-hJFRyedBzIw'),
    ( 4, 'Distance', 'Emily King', 'The Switch', 3, 'https://open.spotify.com/track/1IlBPaXuM7Fl6tiH9CPQlQ?si=FiF_Fy33SuWsB1jEa9MqjA'),
    ( 5, 'Sittin'' On The Dock Of The Bay', 'Otis Redding', '', 1, 'https://open.spotify.com/track/3zBhihYUHBmGd2bcQIobrF?si=_76HHIQnTm68jVArrEtdZg'),
    ( 5, 'I Will Survive', 'Gloria Gaynor', '', 2, 'https://open.spotify.com/track/7cv28LXcjAC3GsXbUvXKbX?si=zYhcZFkMRVewzpti45uWwA'),
    ( 5, 'L-O-V-E', 'Nat King Cole', 'L-O-V-E', 1, 'https://open.spotify.com/track/4QxDOjgpYtQDxxbWPuEJOy?si=T4u3tRNcT6GGlDhVqkUHEg');

INSERT INTO rotation_comments (song_id, created_by, message)
VALUES
    ( 2, 1, 'I love this song'),
    ( 5, 1, 'I kinda like this song'),
    ( 6, 1, 'This song is pretty cool'),
    ( 3, 1, 'I can''t stop listening to this'),
    ( 10, 3, 'Do you know any other songs like this?'),
    ( 14, 3, 'Let''s learn this one for Friday'),
    ( 8, 2, 'Woof woof woof grrrrr woof');

COMMIT;