select
	race
	, sexes.name as sex
	, races.name as race
	, races.id
	/*, sum(age * population) / (1.0 * sum(population)) */
from states
inner join sexes on states.sex=sexes.id 
outer left join races on races.id=states.race
--group by 
--	race
--	, sex
	
--select * from states limit 5; 