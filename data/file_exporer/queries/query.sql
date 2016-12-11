
select parentid,  (select name from files where id=a.parentid), count(*) as count from files a
group by parentid

