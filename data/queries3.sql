select states.name
	, states.race
	, states.origin
	, states.age
	, states.sex
	, statesDirty.population as states_dirty_population
	, states.population 
from states
join statesdirty
	--on statesdirty.population != states.population
	on statesdirty.name=states.name
	and statesdirty.race=states.race
	and statesdirty.origin=states.origin
	and statesdirty.age=states.age
	and statesdirty.sex=states.sex
where statesdirty.population is null or statesdirty.population != states.population